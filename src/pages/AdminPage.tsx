import React, { useState, useEffect } from 'react';

import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  type User 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { assets } from '../lib/cloudinary';
import { LogIn, LogOut, Plus, Trash2, Database, Upload, RefreshCw } from 'lucide-react';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

export const AdminPage: React.FC = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(() => !!auth);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Upload Form State
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    category: '',
    location: '',
    tag: 'residential' as 'residential' | 'commercial' | 'development',
    description: '',
  });

  // Selected Files State
  const [files, setFiles] = useState<{
    col2: File | null;
    col1_1: File | null;
    col1_2: File | null;
  }>({
    col2: null,
    col1_1: null,
    col1_2: null,
  });

  const [uploadProgress, setUploadProgress] = useState<{
    col2: string;
    col1_1: string;
    col1_2: string;
  }>({
    col2: '',
    col1_1: '',
    col1_2: '',
  });

  const fetchProjects = async () => {
    if (!db) return;
    setProjectsLoading(true);
    try {
      const q = query(collection(db!, 'projects'), orderBy('number', 'asc'));
      const querySnapshot = await getDocs(q);
      const list: ProjectData[] = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data() as ProjectData);
      });
      setProjects(list);
    } catch (err) {
      console.error("Error fetching projects from Firestore: ", err);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');
    if (!auth) {
      setAuthError('Authentication service is not available. Please verify Vercel environment variables.');
      setLoginLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth!, email, password);
    } catch (err) {
      const error = err as Error;
      setAuthError(error.message || 'Invalid email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setProjects([]);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  // Helper to upload image to Cloudinary using unsigned preset
  const uploadToCloudinary = async (file: File, inputName: 'col2' | 'col1_1' | 'col1_2'): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'darmr4g5x';
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'utkarsh_unsigned';

    setUploadProgress(prev => ({ ...prev, [inputName]: 'Uploading...' }));
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const clData = new FormData();
    clData.append('file', file);
    clData.append('upload_preset', preset);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: clData
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error?.message || response.statusText || 'Unknown error';
        throw new Error(`Cloudinary upload failed: ${errorMsg}`);
      }
      setUploadProgress(prev => ({ ...prev, [inputName]: 'Uploaded!' }));
      return data.secure_url;
    } catch (err) {
      setUploadProgress(prev => ({ ...prev, [inputName]: 'Failed!' }));
      throw err;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'col2' | 'col1_1' | 'col1_2') => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
      setUploadProgress(prev => ({ ...prev, [fieldName]: 'Ready to upload' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.col2 || !files.col1_1 || !files.col1_2) {
      alert("Please select all 3 required images.");
      return;
    }

    setActionLoading(true);
    try {
      // 1. Upload all 3 files
      const urlCol2 = await uploadToCloudinary(files.col2, 'col2');
      const urlCol1_1 = await uploadToCloudinary(files.col1_1, 'col1_1');
      const urlCol1_2 = await uploadToCloudinary(files.col1_2, 'col1_2');

      // 2. Save document to Firestore
      const projectDoc: ProjectData = {
        number: formData.number,
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        tag: formData.tag,
        images: {
          col2: urlCol2,
          col1_1: urlCol1_1,
          col1_2: urlCol1_2
        }
      };

      if (!db) {
        alert("Database connection is not available.");
        return;
      }
      await setDoc(doc(db!, 'projects', formData.number), projectDoc);
      alert(`Project ${formData.name} uploaded successfully!`);
      
      // Reset Form State
      setFormData({
        number: '',
        name: '',
        category: '',
        location: '',
        tag: 'residential',
        description: ''
      });
      setFiles({ col2: null, col1_1: null, col1_2: null });
      setUploadProgress({ col2: '', col1_1: '', col1_2: '' });
      fetchProjects();
    } catch (err) {
      const error = err as Error;
      console.error(error);
      alert(`Submission failed: ${error.message || error}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (projectNumber: string) => {
    if (!window.confirm(`Are you sure you want to delete project ${projectNumber}?`)) {
      return;
    }
    if (!db) {
      alert("Database connection is not available.");
      return;
    }
    setActionLoading(true);
    try {
      await deleteDoc(doc(db!, 'projects', projectNumber));
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Deletion failed.");
    } finally {
      setActionLoading(false);
    }
  };

  // Seed default 7 core projects to database
  const handleSeedDatabase = async () => {
    if (!window.confirm("This will overwrite or add the default 7 landmark projects to Firestore. Continue?")) {
      return;
    }
    if (!db) {
      alert("Database connection is not available. Please check environment variables.");
      return;
    }
    setActionLoading(true);
    try {
      const defaultProjects: ProjectData[] = [
        {
          number: '01',
          name: 'MS Jewellers',
          category: 'Commercial Showroom',
          location: 'Johari Bazaar',
          description: 'A high-concept jewelry showroom combining state-of-the-art security, custom-engineered display counters and precise task lighting.',
          tag: 'commercial',
          images: {
            col1_1: assets.projects.msCol1_1,
            col1_2: assets.projects.msCol1_2,
            col2: assets.projects.msCol2
          }
        },
        {
          number: '02',
          name: 'Barfiwala Sweets',
          category: 'Premium Retail Showroom',
          location: 'Johari Bazaar',
          description: 'A modern retail sweets showroom blending heritage Rajasthani elements with clean contemporary display cases, hygiene-first packaging areas and warm inviting lighting.',
          tag: 'commercial',
          images: {
            col1_1: assets.projects.barfiwalaCol1_1,
            col1_2: assets.projects.barfiwalaCol1_2,
            col2: assets.projects.barfiwalaCol2
          }
        },
        {
          number: '03',
          name: 'Reeve Inn Hotel',
          category: 'Commercial & Hospitality',
          location: 'Bani Park',
          description: 'A modern commercial hotel development showcasing structural concrete integrity, customized exterior finishes and premium room layouts.',
          tag: 'development',
          images: {
            col1_1: assets.projects.hotelCol1_1,
            col1_2: assets.projects.hotelCol1_2,
            col2: assets.projects.hotelCol2
          }
        },
        {
          number: '04',
          name: 'Paliwal Textile',
          category: 'Textile Center & Office',
          location: 'MI Road',
          description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables and a premium exterior glass facade.',
          tag: 'commercial',
          images: {
            col1_1: assets.projects.paliwalCol1_1,
            col1_2: assets.projects.paliwalCol1_2,
            col2: assets.projects.paliwalCol2
          }
        },
        {
          number: '05',
          name: 'Bhangadiya House',
          category: 'Luxury Residence',
          location: 'Johari Bazaar',
          description: 'A premium luxury residence featuring customized structural designs, high-end marble materials, and a traditional facade integrated with modern space planning.',
          tag: 'residential',
          images: {
            col1_1: assets.projects.bhangadiyaCol1_1,
            col1_2: assets.projects.bhangadiyaCol1_2,
            col2: assets.projects.bhangadiyaCol2
          }
        },
        {
          number: '06',
          name: 'Shri Narayan Sales',
          category: 'Commercial Office & Hub',
          location: 'Johari Bazaar',
          description: 'A contemporary commercial office space and sales hub designed with open planning, premium finishes and integrated smart facilities.',
          tag: 'commercial',
          images: {
            col1_1: assets.generated.office,
            col1_2: assets.generated.reception,
            col2: assets.generated.corridor
          }
        },
        {
          number: '07',
          name: 'Indie Stitch',
          category: 'Bespoke Boutique & Office',
          location: 'Mansarovar',
          description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing and modern design aesthetics.',
          tag: 'commercial',
          images: {
            col1_1: assets.projects.indieCol1_1,
            col1_2: assets.projects.indieCol1_2,
            col2: assets.projects.indieCol2
          }
        }
      ];

      for (const proj of defaultProjects) {
        await setDoc(doc(db!, 'projects', proj.number), proj);
      }
      alert("Successfully seeded 7 default projects!");
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to seed database.");
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-bold">Verifying Session...</span>
      </div>
    );
  }

  // --- LOGIN PANEL VIEW ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center p-6 select-none relative overflow-hidden">
        {/* Decorative Grid and Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,44,21,0.04),transparent)] pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(to_left,rgba(0,0,0,0.01),transparent)] pointer-events-none" />
        
        <div className="w-full max-w-md bg-white border border-black/5 p-8 md:p-10 rounded-[30px] shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-2">Utkarsh Builder</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1B1B1B] tracking-tight">Super Admin Panel</h2>
            <p className="text-xs text-[#6F6F6F] mt-2">Enter credentials to manage portfolio projects</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-[#C92C15]/5 border border-[#C92C15]/20 text-[#C92C15] text-xs leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
              />
              <label className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold">
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
              />
              <label className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold">
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#C92C15] hover:bg-[#D43B13] disabled:bg-[#C92C15]/50 text-white transition-all duration-300 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loginLoading ? 'Authenticating...' : 'Sign In'}</span>
              <LogIn className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGGED-IN ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1B1B1B] py-12 px-6 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-black/5">
          <div>
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-1">Administrative Workspace</span>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1B1B1B]">Portfolio Management Dashboard</h1>
            <p className="text-xs text-[#6F6F6F]">Logged in as: <span className="font-semibold">{user.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#1B1B1B] cursor-pointer"
          >
            <span>Sign Out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Utilities Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-white border border-black/5 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div>
            <h3 className="font-semibold text-sm text-[#1B1B1B]">Quick Database Utilities</h3>
            <p className="text-xs text-[#6F6F6F]">Prefill layout templates or fetch latest active project snapshots</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchProjects}
              disabled={projectsLoading || actionLoading}
              className="inline-flex items-center gap-1.5 border border-black/10 hover:bg-[#FAF7F5] px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${projectsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh List</span>
            </button>
            <button
              onClick={handleSeedDatabase}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 bg-[#C92C15] hover:bg-[#D43B13] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Seed Default Projects</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Create Project Form (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-black/5 p-6 md:p-8 rounded-[30px] shadow-lg text-left">
            <h2 className="text-xl font-semibold text-[#1B1B1B] tracking-tight mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#C92C15]" />
              <span>Upload New Project</span>
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Row 1: Number & Name */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative col-span-1">
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={formData.number}
                    onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    No. (e.g. 08) *
                  </label>
                </div>
                <div className="relative col-span-2">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Project Name *
                  </label>
                </div>
              </div>

              {/* Row 2: Category & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Category *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Location *
                  </label>
                </div>
              </div>

              {/* Tag Dropdown */}
              <div className="relative">
                <select
                  value={formData.tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value as 'residential' | 'commercial' | 'development' }))}
                  required
                  className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors appearance-none cursor-pointer font-bold"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="development">Development</option>
                </select>
                <div className="absolute right-0 top-3 pointer-events-none text-xs text-[#333333]">▼</div>
              </div>

              {/* Description */}
              <div className="relative">
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder=" "
                  className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors resize-none font-bold"
                />
                <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                  Project Description *
                </label>
              </div>

              {/* IMAGE SELECTION BLOCK */}
              <div className="space-y-4 pt-4 border-t border-black/5">
                <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-bold block mb-2">Cloudinary Image Attachments</span>

                {/* Col 2 (Main Tall Image) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xxs font-extrabold text-[#333333] uppercase">Main Showcase Image (Col 2) *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => handleFileChange(e, 'col2')}
                      className="text-xs text-[#6F6F6F] border border-black/10 rounded-lg p-1.5 w-full bg-[#FAF7F5]"
                    />
                    {uploadProgress.col2 && (
                      <span className="text-xxs font-semibold bg-[#C92C15]/10 text-[#C92C15] px-2 py-1 rounded">
                        {uploadProgress.col2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Col 1_1 (Stack Image 1) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xxs font-extrabold text-[#333333] uppercase">Detail View 1 (Col 1_1) *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => handleFileChange(e, 'col1_1')}
                      className="text-xs text-[#6F6F6F] border border-black/10 rounded-lg p-1.5 w-full bg-[#FAF7F5]"
                    />
                    {uploadProgress.col1_1 && (
                      <span className="text-xxs font-semibold bg-[#C92C15]/10 text-[#C92C15] px-2 py-1 rounded">
                        {uploadProgress.col1_1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Col 1_2 (Stack Image 2) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xxs font-extrabold text-[#333333] uppercase">Detail View 2 (Col 1_2) *</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => handleFileChange(e, 'col1_2')}
                      className="text-xs text-[#6F6F6F] border border-black/10 rounded-lg p-1.5 w-full bg-[#FAF7F5]"
                    />
                    {uploadProgress.col1_2 && (
                      <span className="text-xxs font-semibold bg-[#C92C15]/10 text-[#C92C15] px-2 py-1 rounded">
                        {uploadProgress.col1_2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Form */}
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-[#C92C15] hover:bg-[#D43B13] disabled:bg-[#C92C15]/50 text-white transition-all duration-300 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>{actionLoading ? 'Uploading details...' : 'Publish Project'}</span>
                <Upload className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Manage Projects List (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-black/5 p-6 md:p-8 rounded-[30px] shadow-lg text-left flex flex-col min-h-[500px]">
            <h2 className="text-xl font-semibold text-[#1B1B1B] tracking-tight mb-6 flex items-center gap-2">
              <Database className="h-5 w-5 text-[#C92C15]" />
              <span>Active Portfolio List ({projects.length})</span>
            </h2>

            {projectsLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin mb-3" />
                <span className="text-xxs uppercase tracking-wider text-[#6F6F6F] font-bold">Retrieving records...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-black/10 rounded-2xl bg-[#FAF7F5]/50">
                <Database className="h-8 w-8 text-[#6F6F6F]/40 mb-3" />
                <p className="text-sm font-medium text-[#6F6F6F]">No projects stored in Firestore database.</p>
                <p className="text-xs text-[#6F6F6F]/70 mt-1">Use the prefill button above or form on the left to add items.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/5 text-[#6F6F6F] uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-3 px-2">No.</th>
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Tag</th>
                      <th className="py-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 font-semibold text-[#333333]">
                    {projects.map((proj) => (
                      <tr key={proj.number} className="hover:bg-[#FAF7F5]/50 transition-colors">
                        <td className="py-3 px-2 font-bold text-[#C92C15]">{proj.number}</td>
                        <td className="py-3 px-2 text-[#1B1B1B]">{proj.name}</td>
                        <td className="py-3 px-2 text-[#6F6F6F] font-light">{proj.category}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-0.5 rounded uppercase text-[9px] font-bold ${
                            proj.tag === 'residential' ? 'bg-blue-50 text-blue-600' :
                            proj.tag === 'commercial' ? 'bg-green-50 text-green-600' :
                            'bg-purple-50 text-purple-600'
                          }`}>
                            {proj.tag}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleDeleteProject(proj.number)}
                            disabled={actionLoading}
                            className="text-[#C92C15] hover:bg-[#C92C15]/5 hover:text-[#D43B13] p-1.5 rounded transition-colors cursor-pointer inline-flex items-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminPage;

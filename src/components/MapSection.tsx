import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';

export const MapSection: React.FC = () => {
  const directionsUrl = "https://www.google.com/maps/dir//Utkarsh+Builder,+2137,+Nowal+Bhavan,+Dara+Market,+Haldion+Ka+Rasta,+Johri+Bazar,+Jaipur,+Rajasthan+302003/@26.9048432,75.7720324,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x396db7f1e9799d71:0x53ed154c97761b62!2m2!1d75.8275485!2d26.9207124?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D";
  const embedUrl = "https://maps.google.com/maps?q=Utkarsh%20Builder,%202137,%20Nowal%20Bhavan,%20Dara%20Market,%20Haldion%20Ka%20Rasta,%20Johri%20Bazar,%20Jaipur,%20Rajasthan%20302003&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="office-location-section" className="py-12 md:py-20 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5">
              <Compass className="h-3.5 w-3.5 animate-spin-slow" />
              Visit Our Office
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Located in the Heart of Jaipur
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-sm md:text-base text-[#6F6F6F] font-light mt-4 leading-relaxed">
              Drop by our headquarters at Johri Bazar to discuss your next landmark project in person with our engineering and design experts.
            </p>
          </FadeUp>
        </div>

        {/* Map and Details Layout */}
        <FadeUp delay={0.4} y={30} className="w-full">
          <div className="relative bg-[#FAF7F5] rounded-[24px] md:rounded-[40px] p-4 md:p-6 border border-black/5 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Info details column - 4 spans on desktop */}
            <div className="lg:col-span-4 flex flex-col justify-between p-4 md:p-6 space-y-8 z-10 text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-[#C92C15]" />
                  <span className="text-[10px] md:text-xs font-semibold text-[#C92C15] uppercase tracking-wider">Corporate HQ</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1B1B1B]">Utkarsh Builder Office</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#C92C15] shrink-0 mt-1" />
                    <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                      2137, Nowal Bhavan, Dara Market,<br />
                      Haldion Ka Rasta, Johri Bazar,<br />
                      Jaipur, Rajasthan 302003
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/5 pt-6 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6F6F6F] font-medium">Monday to Saturday</span>
                    <span className="text-[#1B1B1B] font-semibold">10:00 AM to 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6F6F6F] font-medium">Sunday</span>
                    <span className="text-[#C92C15] font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all py-3.5 px-6 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95 text-center text-xs md:text-sm uppercase"
              >
                <Navigation className="h-4.5 w-4.5 animate-bounce-slow" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Interactive Map column - 8 spans on desktop */}
            <div className="lg:col-span-8 h-[300px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden border border-black/5 shadow-inner relative group/map">
              <iframe
                title="Utkarsh Builder Office Location Map"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[110%] brightness-[95%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

          </div>
        </FadeUp>
        
      </div>
    </section>
  );
};

import React from 'react';

const PageLost = () => {
  return (
    <section className="py-10 bg-white  ">
      <div className="container mx-auto my-full">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="w-5/6 mx-auto text-center">
              <div 
                className="h-96 bg-center bg-no-repeat" 
                style={{
                  backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)"
                }}
              >
            
              </div>
              
              <div className="-mt-12">
                <h4 className="text-2xl font-bold mb-4">
                  Please sign in to access roadmap page
                </h4>
                
                <p className="mb-4">the page you are looking for not avaible!</p>
                
                <a 
                  href="/" 
                  className="inline-block px-5 py-2.5 bg-green-500 text-white rounded mt-5 mb-5"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageLost;
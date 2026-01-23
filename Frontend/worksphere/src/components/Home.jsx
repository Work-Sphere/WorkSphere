import React from 'react'

function Home() {
  
  return (
    <>
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          {/* Note: Ensure bootstrap-themes.png is in your 'public' folder 
              or import it at the top of the file */}
          <img 
            src="bootstrap-themes.png" 
            className="d-block mx-lg-auto img-fluid" 
            alt="Bootstrap Themes" 
            width="700" 
            height="500" 
            loading="lazy" 
          />
        </div>
       <main>
      {/* Hero Section */}
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Hero Section Title</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Your hero description goes here.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div>
        </div>
      </div>
    </main>
      </div>
    </div>
    </>
  )
}

export default Home
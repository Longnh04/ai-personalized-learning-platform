import '../styles/Pages/RoadmapTesting.css';
import React from 'react';
// import Questions from '../data/pages/RoadmapTesting'
import QuizCard from '../components/features/QuizCard'
 



function RoadmapTesting() {
  return(
     <React.Fragment>
        <div className="roadmap_testing-container">
            <div className="return_back">
                 <h4 
                     className="return"
                     onClick={() => {
                        alert('You haven\'t submitted your test yet!')
                     }}
                 > 
                    <i class="fa-solid fa-arrow-left"></i> Back to roadmap page
                 </h4>
            </div>
            <div className="roadmap_testing-header">
                  <h1 className="roadmap_testing-title">START YOUR TEST</h1>
            </div>
            <QuizCard />
 
        </div>
     </React.Fragment>
  )
}

export default RoadmapTesting;


     

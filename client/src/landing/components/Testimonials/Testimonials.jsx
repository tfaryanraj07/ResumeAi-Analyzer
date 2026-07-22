import {
  Star,
  Quote,
} from "lucide-react";

import "./Testimonials.css";

const testimonials = [
  {
    name: "Raj Solanki",
    role: "Final Year Student",
    company: "Campus Placement",
    review:
      "The ATS score helped me identify missing keywords. After improving my resume, I started getting interview calls within two weeks.",
  },
  {
    name: "Narayan Kumar",
    role: "Final Year Student",
    company: "Campus Placement",
    review:
      "The AI suggestions were surprisingly detailed. They improved both the structure and readability of my resume.",
  },
  {
    name: "Akash Singh",
    role: "Final Year Student",
    company: "Campus Placement",
    review:
      "As a fresher, I wasn't sure how to improve my resume. The AI feedback made everything much easier.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">

      <div className="container">

        <div className="section-heading">

          <span>TESTIMONIALS</span>

          <h2>
            Trusted By Students
            And Professionals
          </h2>

          <p>
            Thousands of job seekers use AI Resume Scanner
            to improve their resumes before applying.
          </p>

        </div>

        <div className="testimonial-grid">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="testimonial-card"
            >

              <Quote className="quote-icon"/>

              <p className="review">

                "{item.review}"

              </p>

              <div className="stars">

                {[...Array(5)].map((_, index)=>(

                  <Star
                    key={index}
                    size={18}
                    fill="#FFD43B"
                    color="#FFD43B"
                  />

                ))}

              </div>

              <div className="user">

                <div className="avatar">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h4>{item.name}</h4>

                  <span>

                    {item.role}

                  </span>

                  <small>

                    {item.company}

                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;
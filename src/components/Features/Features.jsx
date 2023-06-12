import React from "react";
import "./Features.css";
import featureImage1 from "../../assets/chat.png";
import featureImage2 from "../../assets/opinion.png";
import featureImage3 from "../../assets/choice.png";

function Features() {
  const featureList = [
    {
      featureid: 1,
      featureImage: featureImage1,
      featureTitle: "Message and Interactions",
      featureDescription:
        "Experience seamless messaging and interaction with anyone you want to interact from the joined community.",
    },
    {
      featureid: 2,
      featureImage: featureImage2,
      featureTitle: "Upvote and Opinions",
      featureDescription:
        "Every post will have upvote and downvote option and everyone can have their own opinion about it in comments.",
    },
    {
      featureid: 3,
      featureImage: featureImage3,
      featureTitle: "Broad Choices",
      featureDescription:
        "There will be enough communities here that there will be something for everyone to explore.",
    },
  ];
  return (
    <div>
      <div className="font-Inter text-black text-center text-4xl font-bold my-4">
        Perks <span className="text-[#03C988]">&</span> Features{" "}
      </div>

      <div className="flex justify-around flex-wrap">
        {featureList.map((feature) => (
          <div key={feature.featureid} className="feature-card">
            <div>
              <img
                src={feature.featureImage}
                className="feature-image"
                alt=""
              />
            </div>
            <div className="font-Inter font-bold text-black pt-4 text-lg">
              {feature.featureTitle}
            </div>
            <div className="font-Inter font-medium text-black pt-2">
              {feature.featureDescription}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;

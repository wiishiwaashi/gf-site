import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "/Users/ishi/Desktop/github-projects/gf-site-react/src/components/navbar/index.tsx";
import GwaCalc from "../../components/gwa-calc";
import DateChecklist from "../../components/date-checklist";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  margin: 0;
  box-sizing: border-box;
  background: radial-gradient(
    circle,
    rgba(204, 59, 187, 1) 0%,
    rgba(238, 174, 202, 1) 100%
  );
`;

const ActivityCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  border-style: solid;
  transition: 0.2s ease-in;
  margin: 10px 0px;
  padding: 20px;

  hover {
    transition: 0.2s ease-in;
    transform: scale(1.05);
  }
`;

const ActivityCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 100px 0px;
`;

const SectionContainer = styled.section`
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: min(200px, 10%);
`;

const GalleryLinkCard = styled(ActivityCard)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const GalleryCoverImage = styled.img`
  height: 300px;
  width: 300px;
  background-color: white;
`;

const GalleryDesc = styled.div`
  display: flex;
  align-items: center;
  background-color: pink;
  color: black;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

const AnimationTextContainer = styled.div`
  display: flex;
`;

const AnimationText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TYPING_SPEED_MS = 75;
const START_DELAY_MS = 500;
const HOLD_DELAY_MS = 5000;

function useTypingAnimation(text: string) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let cancelled = false;

    const writeLoop = async () => {
      while (!cancelled) {
        setDisplayed("");
        await sleep(START_DELAY_MS);
        for (let i = 1; i <= text.length && !cancelled; i++) {
          setDisplayed(text.slice(0, i));
          await sleep(TYPING_SPEED_MS);
        }
        await sleep(HOLD_DELAY_MS);
      }
    };

    writeLoop();
    return () => {
      cancelled = true;
    };
  }, [text]);

  return displayed;
}

const HomePage = () => {
    const introText = useTypingAnimation(
      "Hi beybey! As you're reading this, I hope it's on or before August 3. I've been lacking inspiration for coding projects recently, and the only thing that could motivate me enough is if it's a gift for you. So, I hope you enjoy! Sending many, many kisses."
    );

    return (
      <PageContainer>
        <NavBar />
        <SectionContainer>
          <AnimationTextContainer>
            <AnimationText>{introText}</AnimationText>
          </AnimationTextContainer>
        </SectionContainer>
        <ActivityCardContainer>
          <ActivityCard>
            <DateChecklist />
          </ActivityCard>

          <GalleryLinkCard>
            <Link to="/gallery">
              <GalleryCoverImage src="/images-gallery/gallery-cover.jpeg" />
            </Link>
            <GalleryDesc>
              <p>Click here for our memories!</p>
            </GalleryDesc>
          </GalleryLinkCard>

          <ActivityCard>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/playlist/5j9JnoZv8OcjjAOxefuj1l?utm_source=generator&theme=0"
              width="100%"
              height="400px"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </ActivityCard>
      </ActivityCardContainer>
      <ActivityCardContainer>
          <ActivityCard>
            <GwaCalc />
          </ActivityCard>
        </ActivityCardContainer>
      </PageContainer>
    );
};

export default HomePage;

import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import NavBar from "../../components/navbar";

type Rect = { top: number; left: number; width: number; height: number };

const HeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  align-items: center;
  background-color: aqua;
`;

const Subtitle = styled.h2`
  margin: 0;
`;

const Note = styled.h3`
  margin: 0;
`;

const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 80px;
  padding: 50px 0px;
`;

const PolaroidCard = styled.div`
  position: relative;
  height: 250px;
  width: 215px;
  margin: 0 auto;
  cursor: pointer;
`;

const PolaroidInner = styled.div<{ $flipped?: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform-origin: center center;

  ${({ $flipped }) =>
    $flipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

const PolaroidImage = styled.img`
  position: absolute;
  height: 100%;
  backface-visibility: hidden;

  &.back {
    transform: rotateY(180deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ZoomedCard = styled(PolaroidCard)<{ $rect: Rect; $flipped: boolean }>`
  position: fixed;
  margin: 0;
  pointer-events: none;
  z-index: 9999;
  transition: top 0.6s ease, left 0.6s ease, transform 0.6s ease;
  width: ${({ $rect }) => $rect.width}px;
  height: ${({ $rect }) => $rect.height}px;

  ${({ $rect, $flipped }) =>
    $flipped
      ? css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(2.5);
        `
      : css`
          top: ${$rect.top}px;
          left: ${$rect.left}px;
          transform: none;
        `}
`;

const POLAROID_IDS = Array.from({ length: 9 }, (_, i) => i + 1);

function rectOf(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

const ImageGallery = () => {
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [zoomedId, setZoomedId] = useState<number | null>(null);
  const [zoomRect, setZoomRect] = useState<Rect | null>(null);
  const [flipped, setFlipped] = useState(false);

  const openZoom = (id: number) => {
    const el = cardRefs.current[id];
    if (!el) return;
    setZoomRect(rectOf(el));
    setZoomedId(id);
    requestAnimationFrame(() => setFlipped(true));
  };

  const closeZoom = () => {
    const el = zoomedId !== null ? cardRefs.current[zoomedId] : null;
    if (el) setZoomRect(rectOf(el));
    setFlipped(false);
  };

  return (
    <>
      <NavBar />
      <HeaderBar>
        <h1>IshiBey Wrapped</h1>
        <Subtitle>(But not in chronological order)</Subtitle>
        <Note>TBU - To Be Updated</Note>
      </HeaderBar>
      <PhotosGrid>
        {POLAROID_IDS.map((id) => (
          <PolaroidCard
            key={id}
            ref={(el) => {
              cardRefs.current[id] = el;
            }}
            onClick={() => openZoom(id)}
          >
            <PolaroidInner>
              <PolaroidImage className="front" src={`/images-gallery/polaroids/${id}.png`} />
              <PolaroidImage className="back" src={`/images-gallery/polaroids/${id} back.png`} />
            </PolaroidInner>
          </PolaroidCard>
        ))}
      </PhotosGrid>

      {zoomedId !== null && zoomRect && (
        <Overlay onClick={closeZoom}>
          <ZoomedCard
            $rect={zoomRect}
            $flipped={flipped}
            onTransitionEnd={(e) => {
              if (!flipped && e.propertyName === "top") setZoomedId(null);
            }}
          >
            <PolaroidInner $flipped={flipped}>
              <PolaroidImage className="front" src={`/images-gallery/polaroids/${zoomedId}.png`} />
              <PolaroidImage className="back" src={`/images-gallery/polaroids/${zoomedId} back.png`} />
            </PolaroidInner>
          </ZoomedCard>
        </Overlay>
      )}
    </>
  );
};

export default ImageGallery;

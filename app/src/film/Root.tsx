import { AbsoluteFill, Composition, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { CSSProperties } from "react";
import { FILM_SHOTS, FPS, STORYBOARD_DURATION_IN_FRAMES, TRANSITION_FRAMES, type FilmShot } from "./shotLibrary";

const fill: CSSProperties = { position: "absolute", inset: 0 };

function CuratedFrameSequence({ shot }: { shot: FilmShot }) {
  const frame = useCurrentFrame();
  const frameNumber = Math.min(shot.durationInFrames, Math.max(1, frame + 1));

  return (
    <Img
      src={staticFile(`${shot.media}/f${String(frameNumber).padStart(3, "0")}.jpg`)}
      style={{ ...fill, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

function ShotScene({ shot, showSlate }: { shot: FilmShot; showSlate: boolean }) {
  const frame = useCurrentFrame();
  const slateOpacity = interpolate(frame, [0, 12, shot.durationInFrames - 18, shot.durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
       <AbsoluteFill style={{ backgroundColor: "#07110d" }}>
         <Img src={staticFile(shot.poster)} style={{ ...fill, width: "100%", height: "100%", objectFit: "cover" }} />
      <CuratedFrameSequence shot={shot} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(5,12,9,.66), transparent 58%), linear-gradient(0deg, rgba(5,12,9,.54), transparent 50%)" }} />
      {showSlate && (
        <AbsoluteFill style={{ ...fill, opacity: slateOpacity, justifyContent: "flex-end", padding: 54, color: "#f4eee1", fontFamily: "Arial, sans-serif" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
            <div>
              <div style={{ color: "#c6a15b", fontSize: 15, letterSpacing: 3, textTransform: "uppercase" }}>{shot.id}</div>
              <div style={{ marginTop: 12, fontSize: 44, fontWeight: 500, letterSpacing: -2 }}>{shot.label}</div>
              <div style={{ marginTop: 12, maxWidth: 650, color: "rgba(244,238,225,.72)", fontSize: 18, lineHeight: 1.45 }}>{shot.purpose}</div>
            </div>
            <div style={{ maxWidth: 310, color: "rgba(244,238,225,.62)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, textAlign: "right" }}>
               <div>{shot.kind} / {shot.sourceStatus}</div>
               <div>{shot.sourceRange}</div>
               <div>master frames {shot.masterStartFrame + 1}–{shot.masterEndFrame}</div>
               <div>{shot.angle}</div>
              <div>OUT → {shot.transitionOut}</div>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

function FilmComposition({ showSlate }: { showSlate: boolean }) {
  return (
    <AbsoluteFill style={{ backgroundColor: "#07110d" }}>
      <TransitionSeries>
        {FILM_SHOTS.map((shot) => (
          <TransitionSeries.Sequence key={shot.id} durationInFrames={shot.durationInFrames}>
            <ShotScene shot={shot} showSlate={showSlate} />
          </TransitionSeries.Sequence>
        )).flatMap((sequence, index, sequences) =>
          index === sequences.length - 1
            ? [sequence]
            : [sequence, <TransitionSeries.Transition key={`${FILM_SHOTS[index].id}-transition`} presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />],
        )}
      </TransitionSeries>
    </AbsoluteFill>
  );
}

export function Root() {
  return (
    <>
      {FILM_SHOTS.map((shot) => (
        <Composition
          key={shot.id}
          id={`Shot-${shot.id}`}
          component={() => <ShotScene shot={shot} showSlate={false} />}
          width={1920}
          height={1080}
          fps={FPS}
          durationInFrames={shot.durationInFrames}
        />
      ))}
      <Composition id="NetsoStoryboard" component={() => <FilmComposition showSlate />} width={1920} height={1080} fps={FPS} durationInFrames={STORYBOARD_DURATION_IN_FRAMES} />
      <Composition id="NetsoFilm" component={() => <FilmComposition showSlate={false} />} width={1920} height={1080} fps={FPS} durationInFrames={STORYBOARD_DURATION_IN_FRAMES} />
      <Composition id="NetsoStoryboardCover" component={() => <Cover />} width={1920} height={1080} fps={FPS} durationInFrames={1} />
    </>
  );
}

function Cover() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#07110d" }}>
      <Img src={staticFile("assets/v2/opening-roof-poster.jpg")} style={{ ...fill, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
      <AbsoluteFill style={{ ...fill, background: "linear-gradient(90deg, rgba(5,12,9,.9), rgba(5,12,9,.18))" }} />
      <div style={{ position: "absolute", left: 90, bottom: 90, color: "#f4eee1", fontFamily: "Arial, sans-serif" }}>
        <div style={{ color: "#c6a15b", fontFamily: "monospace", fontSize: 16, letterSpacing: 4 }}>NETSO°ENERGY / V2</div>
        <div style={{ marginTop: 18, fontSize: 92, fontWeight: 500, letterSpacing: -5 }}>A roof becomes<br /><span style={{ color: "#c6a15b" }}>an energy asset.</span></div>
      </div>
    </AbsoluteFill>
  );
}

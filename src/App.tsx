import Welcome from "./tabs/Welcome";

function App() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://w0.peakpx.com/wallpaper/427/48/HD-wallpaper-purple-haze-world-reflects-water-alien.jpg")',
      }}
      className="fixed z-10 left-0 top-0 w-full h-full bg-no-repeat bg-cover min-w-full min-h-full flex justify-center content-center"
    >
      <Welcome />
    </div>
  );
}

export default App;

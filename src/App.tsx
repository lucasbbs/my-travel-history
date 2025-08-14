import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

function App() {
  return (
    <>
      <VectorMap
        map={worldMill}
        style={{ width: "100vw", height: "100vh" }}
        onRegionTipShow={function (e, el, code) {
          (el as any).html((el as any).html() + ' <br> (code: ' + code + ')');
        }}
      />
    </>
  );
}

export default App;

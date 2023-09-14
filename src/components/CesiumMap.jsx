import React,{useEffect} from 'react'
// import * as Cesium from "cesium"

const CesiumMap = () => {
    useEffect(() => {
        // Create a Cesium Viewer
       // const viewer = new Cesium.Viewer('cesiumContainer');
    
        // Customize the viewer as needed
        //viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); // Remove the default imagery layer
    
        // Create Cesium entities, layers, and other components here



        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjFmNWRmMy01NmY3LTQ1NmUtOGFjNi05YWM4NjBjZGJmY2MiLCJpZCI6ODczNDYsImlhdCI6MTY0ODQ2NzgyM30.8FSjWsdsgMu9yXTEQypFlKYFFu197BWytpcgzhT63Yc";

const viewer = new Cesium.Viewer("cesiumContainer");

try {
  // const imageryLayer = viewer.imageryLayers.addImageryProvider(
  //    Cesium.IonImageryProvider.fromAssetId(4)

    
  // );

  const imageryLayer = viewer.imageryLayers.addImageryProvider(
    // new Cesium.WebMapServiceImageryProvider({
    //     url:'http://localhost:8005/geoserver/Nairobi_data/wms?',
    //     layers:'Nairobi_data:nai_population',
    //     parameters:{
    //         transparent:true,
    //         opacity:0.5,
    //         format:"image/png"
    //     }
    // }),

    new Cesium.WebMapServiceImageryProvider({
      url:'http://localhost:8005/geoserver/realtime_air_quality/wms?',
      layers:'realtime_air_quality:Global_NO2',
      parameters:{
          transparent:true,
          // opacity:0.5,
          format:"image/png"
      }
  })

  
)
imageryLayer.alpha = 0.9
   viewer.zoomTo(imageryLayer);
} catch (error) {
  console.log(error);
}


        
    
        // Clean up when the component unmounts
        return () => {
          viewer.destroy();
        };
      }, []); // The empty array [] makes this effect run only on component mount
  return (
         <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }}></div>
  )
}

export default CesiumMap
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

 

//   const imageryLayer = viewer.imageryLayers.addImageryProvider(
  
//     new Cesium.WebMapServiceImageryProvider({
//       url:'http://localhost:8005/geoserver/realtime_air_quality/wms?',
//       layers:'realtime_air_quality:Global_NO2',
//       parameters:{
//           transparent:true,
//           // opacity:0.5,
//           format:"image/png"
//       }
//   })

  
// )
// imageryLayer.alpha = 0.9
//    viewer.zoomTo(imageryLayer);



// Register a click event handler
// viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
//   // Get the mouse position
//   const pickedObject = viewer.scene.pick(movement.position);
//   console.log(movement, 'picked object')

//   if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.imageryLayer)) {
//     // Check if the picked object is on the desired imagery layer
//     if (pickedObject.imageryLayer === imageryLayer) {
//       const longitude = pickedObject.positionCartographic.longitude;
//       const latitude = pickedObject.positionCartographic.latitude;

//       // Convert the mouse coordinates to imagery coordinates
//       const imageryCoordinates = viewer.scene
//         .pickPosition(movement.position)
//         .clone()
//         .convertToImageryCoordinates(viewer.scene.globe.ellipsoid, imageryLayer);

//       // Query the pixel value (gray index) at the clicked point
//       imageryLayer
//         .pickImageryPixel(imageryCoordinates)
//         .then(function (pixelData) {
//           if (Cesium.defined(pixelData)) {
//             // The pixelData object contains the pixel value
//             const grayIndexValue = pixelData[0]; // Assuming it's a grayscale value

//             console.log('Gray Index Value:', grayIndexValue);
//           } else {
//             console.log('No pixel data found at this location.');
//           }
//         });
//     }
//   }
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

//    const vectorLayer = viewer.imageryLayers.addImageryProvider(
//     new Cesium.WebMapServiceImageryProvider({
//         url:'http://localhost:8005/geoserver/Nairobi_data/wms?',
//         layers:'Nairobi_data:nai_population',
//         parameters:{
//             transparent:true,
//             format:"image/png"
//         }
//     }),


  
// )
// viewer.zoomTo(vectorLayer);
// vectorLayer.alpha = 0.5


//adding vector data
//nairobi population data
viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load(
    "http://localhost:8005/geoserver/Nairobi_data/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Nairobi_data%3Anai_population&maxFeatures=50&outputFormat=application%2Fjson"
  )
)

//styled usa population data

Cesium.Math.setRandomNumberSeed(0)
  var usa =  Cesium.GeoJsonDataSource.load(
    "http://localhost:8005/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp%3Astates&outputFormat=application%2Fjson"
  )

  var nairobi = Cesium.GeoJsonDataSource.load(
    "http://localhost:8005/geoserver/Nairobi_data/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Nairobi_data%3Anai_population&maxFeatures=50&outputFormat=application%2Fjson"
  )
  
  usa.then(function(dataSource) {
    viewer.dataSources.add(dataSource);

    var entities = dataSource.entities.values
    console.log(entities, 'entities'); //logs all states info

    //create random colors for each state
    var colorHash = {}
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var name = entity.name
      console.log(name, 'name') //logs state names
      var color = colorHash[name]
      if(!color) {
        color = Cesium.Color.fromRandom({
          alpha:1.0,
        })
        colorHash[name] = color
      }

      //set the polygon material to a random color
      entity.polygon.material = color
      //remove outlines
      entity.polygon.outline = false

      //extrude by property PERSONS

      entity.polygon.extrudedHeight =  entity.properties.PERSONS / 50
      
    }
  
  })
  .otherwise(function(err) {
    console.log(err)
  })


// zooming effect
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-97.98, 18.55, 4300000), //-97.98, 18.55, 4300000
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-65.0),
    roll: 0.0
  }
})


// Sandcastle.addToolbarMenu(
//   [{
//     text: "Select Layer",
//     onselect: function() {

//     }


//   },

//   {
//     text: "Nairobi Population simple style",
//     onselect: function() {
//       viewer.dataSources.add(
//         Cesium.GeoJsonDataSource.load(
//           "http://localhost:8005/geoserver/Nairobi_data/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Nairobi_data%3Anai_population&maxFeatures=50&outputFormat=application%2Fjson"
//         )

//       )
//     }
//   }
// ]
// )
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
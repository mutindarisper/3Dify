import React, {useEffect, useRef} from 'react'
// import * as Cesium from "cesium"




const CesiumMap = () => {

  let mapviewer = useRef(null)

  //styled usa population data

const addUSAPopulation = () => { 

  Cesium.Math.setRandomNumberSeed(0)
  var usa =  Cesium.GeoJsonDataSource.load(
    "http://localhost:8005/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp%3Astates&outputFormat=application%2Fjson"
  )
usa.then(function(dataSource) {
    mapviewer.current.dataSources.add(dataSource);

    var entities = dataSource.entities.values
    console.log(entities, 'entities'); //logs all states info

    //create random colors for each state
    var colorHash = {}
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var name = entity.name
      console.log(entity, 'entity')
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

      console.log(entity.properties.STATE_ABBR, 'state abrv')
      // entity.polygon.addEventListener('mouseover', () => console.log(entity.properties.STATE_ABBR))

      



      
    }

    var handlerToolTips = new Cesium.ScreenSpaceEventHandler(mapviewer.current.scene.canvas);

var SelectedObj= null;

handlerToolTips.setInputAction(function (movement) {

   SelectedObj= getSelectedObjFromPoint(movement.endPosition);

if (SelectedObj != null) {

         var obj = document.getElementById("cesiumContainer"); obj.title = SelectedObj;

     } else{

    var obj = document.getElementById("cesiumContainer"); obj.title = "";

      }

  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);    

  function getSelectedObjFromPoint(Position){

    // credit Ian Walberg, https://groups.google.com/forum/#!topic/cesium-dev/68GDFwLYWYk 21
    
    var valueToReturn= null;
    
    var pickedObject = mapviewer.current.scene.pick(Position);
    console.log(pickedObject, 'pickedobject')
    
    var pickedObjects = mapviewer.current.scene.drillPick(Position);
    
    var picked = pickedObjects[0];
    
    if (!Cesium.defined(pickedObject)) {
    
    picked = null;
    
    valueToReturn = null;
    
    }
    
    else if (pickedObject.id._name !== undefined) {
      
       valueToReturn = pickedObject.id._name ; //works!
       console.log(valueToReturn, 'names')

    // if (pickedObject.id._name.Path_Name !== undefined && pickedObject.id._name.danger_rating !== undefined) {
    
    // valueToReturn = pickedObject.id._name ;
    
    
    // }
    
    }
    
    else if (pickedObject.id.description !== undefined ){
    
    valueToReturn = pickedObject.id.description._value.value;
    
    }
    
    return valueToReturn;
    
    }




    // const handleMouseEnter = (entity) => {
    //   entity.description = new Cesium.ConstantProperty(
    //     entity.properties.STATE_ABBR
    //   );
    // };
    
    // const handleMouseLeave = (entity) => {
    //   entity.description = undefined;
    // };
    
    // // Attach event handlers to each entity
    // dataSource.entities.values.forEach((entity) => {
    //   entity.billboard && entity.billboard.scale.setValue(0.5); // Optional: Adjust the scale when hovering
    //   entity.label && entity.label.show.setValue(false); // Optional: Hide labels initially
    //   // entity.polygon && entity.polygon.material.setValue(Cesium.Color.BLUE); // Optional: Change polygon color
    //   entity.polyline && entity.polyline.material.setValue(Cesium.Color.RED); // Optional: Change polyline color
    
    //   // entity.polygon &&
    //   //   entity.polygon.addEventListener('mouseover', () => handleMouseEnter(entity));
    //   // entity.polygon &&
    //   //   entity.polygon.addEventListener('mouseout', () => handleMouseLeave(entity));
    // });

    // zooming effect
mapviewer.current.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-97.98, 18.55, 4300000), //-97.98, 18.55, 4300000
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-65.0),
    roll: 0.0
  }
})




  
  })
  .otherwise(function(err) {
    console.log(err)
  })

}
    useEffect(() => {
        // Create a Cesium Viewer
       // const viewer = new Cesium.Viewer('cesiumContainer');
    
        // Customize the viewer as needed
        //viewer.imageryLayers.remove(viewer.imageryLayers.get(0)); // Remove the default imagery layer
    
        // Create Cesium entities, layers, and other components here



        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NjFmNWRmMy01NmY3LTQ1NmUtOGFjNi05YWM4NjBjZGJmY2MiLCJpZCI6ODczNDYsImlhdCI6MTY0ODQ2NzgyM30.8FSjWsdsgMu9yXTEQypFlKYFFu197BWytpcgzhT63Yc";

const viewer = new Cesium.Viewer("cesiumContainer");
mapviewer.current = viewer;

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



  var nairobi = Cesium.GeoJsonDataSource.load(
    "http://localhost:8005/geoserver/Nairobi_data/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Nairobi_data%3Anai_population&maxFeatures=50&outputFormat=application%2Fjson"
  )
  
  




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
         <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }}>


          <button type="button" 
          style={{ position:'absolute',
           top:'5vh', width:'120px', 
           height:'35px', color:'#fff',
            backgroundColor:'#9b9797', zIndex:103,
             borderRadius:'15px', border:'none',
              outline:'none', marginLeft:'10px'}}

              onClick={ addUSAPopulation}
              >USA 3D Population</button>
         </div>
  )
}

export default CesiumMap
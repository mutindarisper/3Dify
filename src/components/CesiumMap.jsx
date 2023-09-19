import React, {useEffect, useRef, useState} from 'react'
// import * as Cesium from "cesium"
import BarChart from './charts/BarChart'




const CesiumMap = ({ viewer, content }) => {

  let mapviewer = useRef(null)
  let bardata = useRef(null)
  let baroptions = useRef(null)
  const [chart_data, setchart_data] = useState(null)
  const [chart_options, setchart_options] = useState(null)
  const [family, setfamily] = useState(null)
  const [employment, setemployment] = useState(null)
  const [population, setpopulation] = useState(null)
  const [stateName, setstateName] = useState(null)
  let families = useRef(null)
  let employed = useRef(null)
  let persons = useRef(null)
  let state_name = useState(null)


  

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
        // position: 'top',
      },
      title: {
        display: true,
        // text: 'Land Cover Chart',
      },
    },
  };

  // baroptions.current = options
  // setchart_options(baroptions.current)


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

      //extract some content for chart
    //  employed.current = entity.properties.EMPLOYED
    //  console.log( employed.current, 'current employed')

    //  setemployment(entity.properties.EMPLOYED)

    //  families.current = entity.properties.FAMILIES
    //  setfamily(entity.properties.FAMILIES)

    //  persons.current = entity.properties.PERSONS
    //  setpopulation(entity.properties.PERSONS)


      const customContent = `<h2>STATE INFO</h2><table border="5";padding="5";width="500">
      <tr>
          <th>Column 1</th>
          <th>Column 2</th>
      </tr>
      <tr>
          <td>POPULATION</td>
          <td>${entity.properties.PERSONS}</td>
      </tr>
      <tr>
          <td>STATE</td>
          <td>${entity.properties.STATE_ABBR}</td>
      </tr>
      <tr>
          <td>EMPLOYED</td>
          <td>${entity.properties.EMPLOYED}</td>
      </tr>
      <tr>
          <td>FAMILIES</td>
          <td>${entity.properties.FAMILIES}</td>
      </tr>

      <tr>
      <td>POPULATION</td>
      <td>${entity.properties.PERSONS}</td>
  </tr>
  <tr>
      <td>STATE</td>
      <td>${entity.properties.STATE_ABBR}</td>
  </tr>
  <tr>
      <td>EMPLOYED</td>
      <td>${entity.properties.EMPLOYED}</td>
  </tr>
  <tr>
      <td>FAMILIES</td>
      <td>${entity.properties.FAMILIES}</td>
  </tr>
  </table>`;
      // Display the custom info box when the entity is clicked
    entity.description = customContent;




      



      
    }

    const addStats = () => {
  
  
      // Data for the bar chart
      const data = {
        labels: ['EMPLOYED', 'FAMILIES', 'PERSONS'],
        datasets: [
          {
            // label: 'Sales Data',
            backgroundColor: ['#0cefef', '#b09bff', '#ff8c00'],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            data: [families.current, employed.current, persons.current],
          },
        ],
      };
      console.log(data.datasets[0].data, 'data array')
    
    
      bardata.current = data
      setchart_data(bardata.current)
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

    var population_value = null;

    var population_value = null;
    var employ_value = null;
    var family_value = null;

        families.current = family_value
        employed.current = employ_value
        persons.current = population_value
        state_name.current = valueToReturn


        setemployment(employed.current)
   
        setfamily(families.current) 
      
        setpopulation(persons.current)

        setstateName( state_name.current)
    
    var pickedObject = mapviewer.current.scene.pick(Position);
    console.log(pickedObject, 'pickedobject')
    
    var pickedObjects = mapviewer.current.scene.drillPick(Position);
    
    var picked = pickedObjects[0];
    
    if (!Cesium.defined(pickedObject)) {
    
    picked = null;
    
    valueToReturn = null;

    population_value = null;
    employ_value = null;
    family_value = null;


    
    }
    
    else if (pickedObject.id._name !== undefined) {
      
       valueToReturn = pickedObject.id._name ; //works!

       population_value = pickedObject.id._properties._PERSONS._value //works!

       employ_value = pickedObject.id._properties._EMPLOYED._value
        

        family_value = pickedObject.id._properties._FAMILIES._value


        
        families.current = family_value
        employed.current = employ_value
        persons.current = population_value
        state_name.current = valueToReturn



        setemployment(employed.current)
   
        setfamily(families.current) 
      
        setpopulation(persons.current)

        setstateName(state_name.current)
   


       console.log(valueToReturn, 'names')
      //  console.log(population_value, 'pop value')
      //  console.log( employ_value, ' employed value')
      // console.log( family_value, ' families value')

      console.log(persons.current, 'pop value')
      console.log(  employed.current , ' employed value')
     console.log(  families.current, ' families value')

     addStats()
      //  console.log(families.current, 'familiess.current value')


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



const infoBox = new Cesium.Entity({
  description: new Cesium.ConstantProperty(content),
});

 // Add it to the viewer
 mapviewer.current.selectedEntity = infoBox;


     

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

          if (infoBox) {
            viewer.selectedEntity = undefined;
            // infoBox.destroy();
          }

        };
      }, []); // The empty array [] makes this effect run only on component mount [viewer, content]
  return (
         <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }}>


          <button type="button" 
          style={{ position:'absolute',
           top:'5vh', width:'120px', 
           height:'35px', color:'#fff',
            backgroundColor:'#9b9797', zIndex:103,
             borderRadius:'15px', border:'none',
              outline:'none', marginLeft:'10px'}}

              onClick={ () => addUSAPopulation() } //addStats()
              >USA 3D Population</button>



<button type="button" 
          style={{ position:'absolute',left:'15vh',
           top:'5vh', width:'120px', 
           height:'35px', color:'#fff',
            backgroundColor:'#9b9797', zIndex:103,
             borderRadius:'15px', border:'none',
              outline:'none', marginLeft:'10px'}}

              onClick={ () => addUSAPopulation() } //addStats()
              >Air Quality </button>

              {
                bardata.current != null ? 

                <div className="add_info" style={{zIndex:103,position:'absolute',
           top:'65vh', right:"2px", width:'450px', 
           height:'300px', color:'#242424',
            backgroundColor:'#fff', zIndex:103,
             borderRadius:'15px', border:'none',
              outline:'none', marginRight:'10px',}}>
                
                <p className="title" >{stateName}</p>

                <BarChart data={chart_data} options={options} /> 
                {/* data={chart_data} options={chart_options}  display:'flex', justifyContent:'center' */}

              </div>

              : ''
              }

              
         </div>
  )
}

export default CesiumMap
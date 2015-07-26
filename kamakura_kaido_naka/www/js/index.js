/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var sw = L.latLng(35.470737,139.530487),
         ne = L.latLng(35.517697,139.562072),
        bounds = L.latLngBounds(sw,ne);
        var map = L.map('map', {center: [35.4749914, 139.549343], zoom: 16, touchZoom: false, maxBounds: bounds});
        
        L.tileLayer('./img/map/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                    minZoom: 14
                    }).addTo(map);
        
        
        
        //
        var data  = [{
                     "type": "Feature",
                     "properties":{
                        "title":"首塚",
                        "desc":"",
                        "image":"img/kubizuka.jpg"},
                     "geometry": {
                        "type": "Point",
                        "coordinates":[139.5453583,35.4749152]
                        }
                     },
                    

                     {"type": "Feature",
                     "properties":{"title":"白糸の滝","desc":"",
                     "image":"img/shiraito_no_taki.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[139.547792,35.4820545]
                     }}
                     ,
                     
                     {"type": "Feature",
                     "properties":{"title":"白根不動","desc":"",
                     "image":"img/shirane_fudou.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[139.5485561,35.4820182]
                     }}
                     ,
                     
                     {"type": "Feature",
                     "properties":{"title":"白根神社","desc":"",
                     "image":"img/shirane_jinjya.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[139.5485122,35.4825105]
                     }}
                     ,
                     
                     {"type": "Feature",
                     "properties":{"title":"畠山重忠公碑","desc":"",
                     "image":"img/hatayama_hi.jpg"},
                     "geometry": {
                     "type": "Point",
                     "coordinates":[139.5442988,35.4753826]
                     }}
                     ];
        
        L.Icon.Default.imagePath = 'css/images';
        var geo_layer = L.geoJson(data,{ onEachFeature:function(f,l){
                                l.bindPopup(
                                           f.properties.title);
                                l.on("click",function(){
                                               document.getElementById("title").innerText = f.properties.title;
                                               document.getElementById("description").innerText = f.properties.desc;
                                               document.getElementById("image").setAttribute("src",f.properties.image);
                                     
                                     });
                  
                  $("#midokoro").append('<li lng="'+ f.geometry.coordinates[0] + '" lat="' + f.geometry.coordinates[1] + '" ><a href="#"  >' + f.properties.title + '</a></li>').listview().listview('refresh');

                                    
                                  }});
        geo_layer.addTo(map);
        
        
        // Click on the List in Side panel
        $(document).on("click", '#midokoro  li', function(event) {
                       $("#midokoro_panel").panel("close");
                       var selected = L.latLng($(this).attr("lat"),$(this).attr("lng"));
                       map.panTo(selected);
                       geo_layer.eachLayer(function(marker){
                       if ( marker.getLatLng().equals( selected )){
                                           marker.fire('click');
                        }
                                           
                                           });
         }
        );
    
    }

};

app.initialize();
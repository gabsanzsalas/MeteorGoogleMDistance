import { Meteor } from 'meteor/meteor';

class mapResult {
  origin; 
  destination;
  distanceTxt;
  durationTxt;
  distance;
  duration;

}

Meteor.startup(() => {
    Meteor.methods({
        evalMapRequest: function(origin, destination) {
          this.unblock();
          var key='AIzaSyAmnTiUl8GlHY5vy6lelf9NtaT1IE5Xg0E';

          //call Google
          var response = HTTP.call( 'GET',
           'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+
           '&destinations='+destination+'&mode=walking&units=metric&language=en&avoid=&key='+key, {} );
          var serverResult=JSON.parse( response.content);
          var map = new mapResult();
          map.origin=  serverResult.origin_addresses;
          map.destination=serverResult.destination_addresses;
          map.distanceTxt=serverResult.rows[0].elements[0].distance.text;
          map.distance=serverResult.rows[0].elements[0].distance.value;
          map.durationTxt=serverResult.rows[0].elements[0].duration.text;
          map.duration=serverResult.rows[0].elements[0].duration.value;
          return map;
        }
      });
});



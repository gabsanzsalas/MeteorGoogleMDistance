import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.templateTest.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.origin_addresses = new ReactiveVar('');
  this.destination_addresses = new ReactiveVar('');
  this.distance = new ReactiveVar('');
  this.duration = new ReactiveVar('');

});

Template.templateTest.helpers({
  origin_addresses() {
    return Template.instance().origin_addresses.get();
  },
  destination_addresses() {
    return Template.instance().destination_addresses.get();
  }
  ,
  distance() {
    return Template.instance().distance.get();
  }
  ,
  duration() {
    return Template.instance().duration.get();
  }
});

Template.templateTest.events({
  'submit .form-evaluate'(event, template) {
    event.preventDefault();
    
    var clientResult = Meteor.apply('evalMapRequest',
       [event.target.txtOrigin.value, event.target.txtDest.value]
      , {returnStubValue: true},
    
      function(err, mapResult) {
        template.origin_addresses.set(mapResult.origin);
        template.destination_addresses.set(mapResult.destination);
        template.distance.set(mapResult.distanceTxt);
        template.duration.set(mapResult.durationTxt);
    }
    );
    
  },
  
});



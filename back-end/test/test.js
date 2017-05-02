const expect = require('chai').expect;
const request = require('request-promise');
const Q = require('q');
const _ = require('lodash');

const serverUrl = 'http://localhost:3000/api/v1/';
const userMap = {
    Dan: '58af379b079f33252df0e615',
    Alice: '58af3770079f33252df0e613',
    Bob: '58af375d079f33252df0e612'
}
const groupMap = {
  administrators: '58af3789079f33252df0e614'
}
const permissionMap = {
  view: 'view',
  modify: 'modify'
}
const objectMap = {
  messageOfTheDay: '58af37e9079f33252df0e617'
}

function processResults(results, done) {
  var rejects = _.filter(results, {state: 'rejected'});
  var fulfilled = _.filter(results, {state: 'fulfilled'});

  // Check if all fulfilled have success = true (not thrown an internal error)
  var success = _.map(fulfilled, function (item) { return item.value.success }).indexOf(false) === -1;

  // Check if has no rejects
  success = success && rejects.length === 0;

  expect(success).to.be.true;
  done();
}

describe("Testing API...", function() {
  
  it("Add users called ‘Bob’ and ‘alice’ to the group called ‘administrators’", function (done) {
    var uriBob = serverUrl + 'group/' + groupMap.administrators + '/user/' + userMap.Bob;
    var uriAlice = serverUrl + 'group/' + groupMap.administrators + '/user/' + userMap.Alice;

    var promises = [
        request({method: 'PUT', json: true, uri: uriBob}),
        request({method: 'PUT', json: true, uri: uriAlice})
    ]

    // Request and process
    Q.allSettled(promises).then(function (results) { processResults(results, done); })
  })

  it("Assign the user called ‘dan’ and group ‘administrators’ the permission called “VIEW” over the “message of the day” object", function (done) {
    var uri = serverUrl + 'user/' + userMap.Dan + '/permission/' + permissionMap.view + '/object/' + objectMap.messageOfTheDay;

    var promises = [
        request({method: 'PUT', json: true, uri: uri})
    ]

    // Request and process
    Q.allSettled(promises).then(function (results) { processResults(results, done); })
  })

  it("Assign the “modify” permission to administrators group for the “message of the day” object.", function (done) {
    var uri = serverUrl + 'group/' + groupMap.administrators + '/permission/' + permissionMap.modify + '/object/' + objectMap.messageOfTheDay;

    var promises = [
        request({method: 'PUT', json: true, uri: uri})
    ]

    // Request and process
    Q.allSettled(promises).then(function (results) { processResults(results, done); })
  })

  it("Query for the permissions that Alice has over the “message of the day” object. (This should return “view” and “modify”.)", function (done) {
    var uri = serverUrl + 'user/' + userMap.Alice + '/object/' + objectMap.messageOfTheDay;

    var promises = [
        request({method: 'GET', json: true, uri: uri})
    ]

    // Request and process
    Q.allSettled(promises).then(function (results) {
      var rejects = _.filter(results, {state: 'rejected'});
      var fulfilled = _.filter(results, {state: 'fulfilled'});

      // Check if has no rejects and fulfilled has one item
      var success = rejects.length === 0 && fulfilled.length === 1;

      if(success) {
        var fulfilledItem = fulfilled[0];

        // Check if fulfilled have success = true (not thrown an internal error)
        success = success && fulfilledItem.value.success;

        // Check if Alice has “view” and “modify” rights
        var aliceRights = fulfilledItem.value.data;
        success = success && aliceRights.indexOf(permissionMap.view) !== -1 && aliceRights.indexOf(permissionMap.modify) !== -1;
      }

      expect(success).to.be.true;
      done();
    })
  })

  it("Test if user Dan has the modify permission on “message of the day” object", function (done) {
    var uri = serverUrl + 'user/' + userMap.Dan + '/permission/' + permissionMap.modify + '/object/' + objectMap.messageOfTheDay;

    var promises = [
        request({method: 'GET', json: true, uri: uri})
    ]

    // Request and process
    Q.allSettled(promises).then(function (results) {
      var rejects = _.filter(results, {state: 'rejected'});
      var fulfilled = _.filter(results, {state: 'fulfilled'});

      // Check if has no rejects and fulfilled has one item
      var success = rejects.length === 0 && fulfilled.length === 1;

      if(success) {
        var fulfilledItem = fulfilled[0];

        // Check if fulfilled have success = true (not thrown an internal error)
        success = success && fulfilledItem.value.success;

        // Check if Dan has the modify permission on the object
        success = success && fulfilledItem.value.data;
      }

      expect(success).to.be.true;
      done();
    })
  })



})

// This handles when the test expectation fails
process.on('unhandledRejection', function (reason) {
    throw reason;
});

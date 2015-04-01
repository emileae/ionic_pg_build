angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, Camera) {
  $scope.loggedIn = false;
  ionic.Platform.ready(function(){  
    if( localStorage.getItem("userid") ){
      $scope.loggedIn = true;
    }else{
      $scope.loggedIn = false;
    };
  });

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };

})

.controller('CameraCtrl', function($scope, Camera){

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      alert(imageURI);
    }, function(err) {
      alert(err);
    });
  };

})

/*.controller('DashCtrl', function($scope) {})*/

.controller('DashCtrl', function($scope, $http, $ionicModal, $cordovaSocialSharing) {
  
  //http fetch content
  $http.get('http://supernice-staging-a.appspot.com/api/goals').then(function(resp) {
    //console.log('Success - emiru', resp);
    $scope.goals = resp.data.goals;
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  });

 //modal
 $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.goal_modal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/comment-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.comment_modal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/pin-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.pin_modal = modal;
  });

  $scope.openModal = function(title, modal_type) {
    $scope.current_title = title;
    if(modal_type == "goal-modal"){
      $scope.goal_modal.show();
    }else if(modal_type == "comment-modal"){
      $scope.comment_modal.show();
    }else if(modal_type == "pin-modal"){
      $scope.pin_modal.show();
    };
  };
  $scope.closeModal = function(modal_type) {
    if(modal_type == "goal-modal"){
      $scope.goal_modal.hide();
    }else if(modal_type == "comment-modal"){
      $scope.comment_modal.hide();
    }else if(modal_type == "pin-modal"){
      $scope.pin_modal.hide();
    };
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  //social sharing
  $scope.share = function (image_url) {

    console.log("Debug!!!!!");
    console.log($cordovaSocialSharing);
    alert("in fn");

    $cordovaSocialSharing.share('Join Bucket Vision', 'Bucket Vision', null, 'http://supernice-staging-a.appspot.com').then(function(result) {
      alert(JSON.stringify(result));
    }, function(err) {
      alert(JSON.stringify(err));
    });
  };

})

.controller('LoginCtrl', function($scope) {
  console.log("Login screen");
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

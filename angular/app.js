
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('blogApp', []); 


// this is without $scope
myApp.controller('mainController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'edWisor Blog';
  this.pageSubHeading = 'A collection of experience by students, alumni and edWisor.com team'
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.blogs = [];
 // console.log(this.blogs);

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.loadAllBlogs = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blogs = response.data.data;
          //console.log(main.blogs);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Chedddck the console.");
          console.log("hello")
          //console.log(response);

        });


  }// end load all blogs
   


}]); // end controller





myApp.controller('singleBlogController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = '';
  this.pageSubHeading = ''
 

  this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name

  this.blogId = this.getParameterByName('blogId');
  //console.log(this.blogId);


  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.loadSingeBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller



myApp.controller('blogCreateController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Create a blog post';
  this.pageSubHeading = 'please fill all the data'
 

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.createPost = function(){

      var myData ={

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      $http({
        method: 'POST',
        data  : myData,
        url: main.baseUrl+'/create'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog created successfully");
          window.location = 'post.html?blogId='+response.data.data.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller




myApp.controller('blogDeleteController',['$http',function($http) {

  //create a context
  var main = this;

 this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name

  this.blogId = this.getParameterByName('blogId');
 // this.pageHeading = 'Create a blog post';
  //this.pageSubHeading = 'please fill all the data'
 

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.deletePost = function(){

   //   var myData ={

     //     heading     : main.heading,
       //   subHeading  : main.subHeading,
         // bodyHtml    : main.bodyHtml,
         // author      : main.author


//      }

      console.log(this.blogId);
   
      $http({
        method: 'POST',
        //data  : myData,
        url: main.baseUrl+'/' + this.blogId +'/remove'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog deleted successfully");
          window.location = 'index.html';
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller




myApp.controller('blogEditController',['$http',function($http) {

  //create a context
  var main = this;

 this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name

  this.blogId = this.getParameterByName('blogId');


  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';
  console.log(this.blogId)
  
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.blog = response.data.data;

            //this.pageHeading = main.pageHeading
            //this.pageSubHeading = 'please fill all the data'
 
          console.log(main.blog);
          this.headi =""
          this.pageHeading = main.blog.heading;
          this.pageSubHeading = main.blog.subHeading;
          this.bodyHtml = main.blog.bodyHtml
          this.author = main.blog.author

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          //console.log(response);
        });


  // end load all blogs

  //this.pageHeading = 'Create a blog post';
  //this.pageSubHeading = 'please fill all the data'
 

 // this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  //this.createPost = function(){

    //  var myData ={

     //     heading     : main.heading,
     //     subHeading  : main.subHeading,
     //     bodyHtml    : main.bodyHtml,
     //     author      : main.author


     // }

      //console.log(myData);
   
     // $http({
    // //   method: 'POST',
     //   data  : myData,
     //   url: main.baseUrl+'/create'
     // }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
       //   alert("blog created successfully");
        //  window.location = 'post.html?blogId='+response.data.data.blogId;
          

       // }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
       //   alert("some error occurred. Check the console.");
      //    console.log(response);
       // });


 //}// end load all blogs
   


}]); // end controller
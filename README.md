# angularjs-pagination

this is an angular directive plugin used for ajax app pagination.

![effect-view](http://images.cnblogs.com/cnblogs_com/leonwang/758364/o_pagination.png)

## Usage

#### add the style link

```html
<link href="lib/ng-pagination.min.css" rel="stylesheet" />
```

#### add the script reference after angular.

```html
<script src="../angularjs/angular-1.2.21.min.js"></script>
<script src="lib/ng-pagination.min.js"></script>
```

#### add ng-pagination as the module dependency
in the controller , you get the total page count from an ajax request and set $scope.pageCount
and set $scope.onPageChange function to handle page change event, in the handler function you can get currentPage via $scope.currentPage then you can send another ajax request to load data from server. that's it.

```js
var app = angular.module('app', ['ng-pagination']);
  app.controller('demoCtrl', function($scope) {
    $scope.onPageChange = function() {
      // ajax request to load data
      console.log($scope.currentPage);
    };

    // set pagecount in $scope
    $scope.pageCount = 100;
  });
```

#### add pager directive to the view

set page-count,current-page and on-page-change as below 

```html
<pager page-count="pageCount" current-page="currentPage" on-page-change="onPageChange()"></pager>
```

## Customization options

<table>
  <thead>
    <tr>
      <th>Option Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>firstText</td>
      <td>set the first page button text, e.g first-text="First Page"<br> default is "First"</td>
    </tr>
     <tr>
      <td>lastText</td>
      <td>set the last page button text, e.g last-text="Last Page"<br> default is "Last"</td>
    </tr>
   <tr>
      <td>prevText</td>
      <td>set the prev page button text, e.g prev-text="Prev Page"<br>default is "Prev"</td>
    </tr>
   <tr>
   <tr>
      <td>nextText</td>
      <td>set the next page button text, e.g next-text="Next Page"<br>default is "Next"</td>
    </tr>
    <tr>
      <td>showFirstLastText</td>
      <td>set whether to show the first and last page button<br> default is true</td>
    </tr>
     <tr>
      <td>showGoto</td>
      <td>set whether to show the goto textbox<br> default is false</td>
    </tr>
    <tr>
      <td>gotoText</td>
      <td>set the goto text<br>default is "Goto Page", only the showGoto option is set to true, it will be shown</td>
    </tr>
      <tr>
      <td>showIfOnePage</td>
      <td>set whether to show the pagination directive when there is only one page<br>default is false, it will hide when the pagecount equals one</td>
    </tr>
     <tr>
      <td>visiblePageCount</td>
      <td>set the visible page button count. e.g. the pageCount is 100, and the currentPage is 50, it will only show page 45 to page 54<br>default value is 10</td>
    </tr>
</table>

## Demo

you can open demo/index.html to see it

## Others

you can change the default style, and set it you like in ng-pagination.css :) 

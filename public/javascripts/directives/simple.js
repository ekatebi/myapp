/**
 * Created by ekatebi on 1/2/15.
 */

var myApp = angular.module('routerApp');
/*
myApp.directive('ngCity', function() {
    return {
        controller: function($scope) {}
    }
});
*/

myApp.directive('ngSparkline', function() {
    return {
        restrict: 'A',
//        require: '^ngCity',
        transclude: true,
//        priority: 10,
//        replace: true,
//        terminal: true,

        scope: {
        },

        //template: '<div class="sparkline"><h4>Weather for {{ngCity}}</h4></div>',
        template: '<div class="sparkline"><div ng-transclude></div><div class="graph"></div></div>',
        controller: ['$log', '$scope', '$http', function($log, $scope, $http) {
            $log.log('from directive');
            console.log('from directive (console)');
//            $log.log('city: ' + $scope.city);

            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&callback=JSON_CALLBACK&q="

            $scope.getTemp = function(city) {

                $log.log('getTemp - ' + city);

                $http({
                    method: 'JSONP',
                    url: url + city
                }).success(function(data) {

//                    $log.log(angular.toJson(data,0));

                    var weather = [];
                    angular.forEach(data.list, function(value){
                        weather.push(value);
                    });

                    $scope.weather = weather;

                    //$log.log($scope.weather);
                });
            };

            $scope.getTempx = function(city) {

                var data_string = {"cod":"200","message":0.0963,"city":{"id":5391959,"name":"San Francisco","coord":{"lon":-122.419418,"lat":37.774929},"country":"US","population":0,"sys":{"population":0}},"cnt":7,"list":[{"dt":1420315200,"temp":{"day":51.8,"min":24.19,"max":51.8,"night":26.35,"eve":34.38,"morn":24.19},"pressure":1029.76,"humidity":65,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":4.34,"deg":26,"clouds":0},{"dt":1420401600,"temp":{"day":50.18,"min":28.6,"max":50.67,"night":28.6,"eve":35.35,"morn":30.36},"pressure":1035.03,"humidity":69,"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"speed":4.21,"deg":27,"clouds":20},{"dt":1420488000,"temp":{"day":53.71,"min":27.19,"max":54.43,"night":31.53,"eve":39.34,"morn":27.19},"pressure":1034.09,"humidity":76,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":4.02,"deg":21,"clouds":0},{"dt":1420574400,"temp":{"day":57.92,"min":30.22,"max":58.3,"night":33.12,"eve":43.34,"morn":30.22},"pressure":1030.16,"humidity":69,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":4.45,"deg":24,"clouds":0},{"dt":1420660800,"temp":{"day":50.45,"min":33.57,"max":63.68,"night":40.23,"eve":63.68,"morn":33.57},"pressure":1022.79,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":3.33,"deg":29,"clouds":0},{"dt":1420747200,"temp":{"day":52.56,"min":35.33,"max":63.27,"night":41.49,"eve":63.27,"morn":35.33},"pressure":1021.34,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"02d"}],"speed":2.46,"deg":1,"clouds":7},{"dt":1420833600,"temp":{"day":51.85,"min":38.16,"max":62.49,"night":41.56,"eve":62.49,"morn":38.16},"pressure":1016.76,"humidity":0,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"speed":2.61,"deg":199,"clouds":53}]};

                var data = angular.fromJson( data_string );

                $log.log('data: ' + angular.toJson(data,0));

                var weather = [];
                    angular.forEach(data.list, function(value){
                        $log.log('value: ' + angular.toJson(value,0));
                        weather.push(value);
                    });

                    $log.log('weather: ' + angular.toJson(weather,0));

                    $scope.weather = weather;

                    //$log.log($scope.weather);
                }

        }],
        link: function(scope, iElement, iAttrs, ctrl) {
            scope.getTemp(iAttrs.city);
            scope.$watch('weather', function(newVal) {
                // the `$watch` function will fire even if the
                // weather property is undefined, so we'll
                // check for it
                if (newVal) {

//                    console.log('watch newval: ' + angular.toJson(newVal,0));

                    console.log("temp: " + iAttrs.temp);

                    var highs = [];

                    angular.forEach(scope.weather, function(value){

//                        console.log('watch value: ' + angular.toJson(value,0));

                        highs.push(value.temp[iAttrs.temp]);
                    });

                    chartGraph(iElement, highs, iAttrs);
                }
            });
        }
    }
});

var chartGraph = function(element, data, opts) {
    var width = opts.width || 200,
        height = opts.height || 200,
        padding = opts.padding || 30;

    console.log('city attr: ' + opts.city);
    console.log('width: ' + width);
    console.log('height: ' + height);
    console.log('padding: ' + padding);

    console.log(angular.toJson(data,0));

// chart
    var svg     = d3.select(element[0])
        .append('svg:svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'sparkline')
        .append('g')
        .attr('transform', 'translate('+padding+', '+padding+')');

    svg.selectAll('*').remove();

    var maxY    = d3.max(data),
        x       = d3.scale.linear()
            .domain([0, data.length])
            .range([0, width]),
        y       = d3.scale.linear()
            .domain([0, maxY + 10])
            .range([height, 0]),
        yAxis = d3.svg.axis().scale(y)
            .orient('left')
            .ticks(5);

    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);

    var line    = d3.svg.line()
            .interpolate('linear')
            .x(function(d,i){
                console.log(d + ',' + i);
                return x(i);
            })
            .y(function(d,i){
                console.log(d + ',' + i);
                return y(d);}
        ),
        path    = svg.append('svg:path')
            .data([data])
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '1.5');

    };

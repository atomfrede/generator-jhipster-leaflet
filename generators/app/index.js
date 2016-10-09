'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {
  moduleName: 'leaflet-maps'
};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  initializing: {
    templates: function(args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
      if (args == 'default') {
        this.leafletDefault = 'default';
      }
    }
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('JHipster leaflet-maps') + ' generator! ' + chalk.yellow('v' + packagejs.version)
    ));

    var questions = 1;

    if (this.leafletDefault == 'default') {
      this.props = {};
      this.props.addLeaflet = true;
      done();
    } else {
      var prompts = [{
        type: 'confirm',
        name: 'addLeaflet',
        message: '(1/' + questions + ') Do you want to add ui-leaflet maps?',
        default: true
      }];

      this.prompt(prompts, function(props) {
        this.props = props;
        // To access props later use this.props.someOption;
        done();
      }.bind(this));
    }
  },

  writing: function() {
    var done = this.async();

    // if no selection, do nothing
    if (!this.props.addLeaflet) {
      this.log('Nothing to do...');
      return;
    }

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.angularAppName = jhipsterVar.angularAppName;
    this.frontendBuilder = jhipsterVar.frontendBuilder;
    var webappDir = jhipsterVar.webappDir;

    jhipsterFunc.addBowerDependency('ui-leaflet', '2.0.0');
    jhipsterFunc.addBowerDependency('leaflet-search', '2.7.0');

    jhipsterFunc.addAngularJsModule('nemLogging');
    jhipsterFunc.addAngularJsModule('ui-leaflet');

    // Sample page
    this.template('src/main/webapp/app/leaflet-maps/_leaflet-maps.controller.js', webappDir + 'app/leaflet-maps/leaflet-maps.controller.js');
    this.template('src/main/webapp/app/leaflet-maps/_leaflet-maps.html', webappDir + 'app/leaflet-maps/leaflet-maps.html');
    this.template('src/main/webapp/app/leaflet-maps/_leaflet-maps.state.js', webappDir + 'app/leaflet-maps/leaflet-maps.state.js');
    jhipsterFunc.addElementToMenu('leaflet-maps', 'globe', false);

    done();

  },

  install: function() {
    var injectDependenciesAndConstants = function() {
        this.spawnCommand('gulp', ['install']);
    };

    this.installDependencies({
      callback: injectDependenciesAndConstants.bind(this)
    });

  }

});

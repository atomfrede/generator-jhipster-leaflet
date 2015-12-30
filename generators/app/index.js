'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

// Stores JHipster variables
var jhipsterVar = {
  moduleName: 'leaflet-maps'
};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  templates: function() {
    this.composeWith('jhipster:modules', {
      options: {
        jhipsterVar: jhipsterVar,
        jhipsterFunc: jhipsterFunc
      }
    });
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('JHipster leaflet-maps') + ' generator! ' + chalk.yellow('v' + packagejs.version)
    ));

    var questions = 1;

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
  },

  writing: function() {
    var done = this.async();

    // if no selection, do nothing
    if (!this.addLeaflet) {
      this.log('Nothing to do...');
      return;
    }

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.angularAppName = jhipsterVar.angularAppName;
    this.frontendBuilder = jhipsterVar.frontendBuilder;
    var webappDir = jhipsterVar.webappDir;

    jhipsterFunc.addBowerDependency('ui-leaflet', '1.0.0');

    jhipsterFunc.addAngularJsModule('nemLogging');
    jhipsterFunc.addAngularJsModule('ui-leaflet');

    // Sample page
    this.template('src/main/webapp/scripts/app/leaflet-maps/_leaflet-maps.controller.js', webappDir + 'scripts/app/leaflet-maps/leaflet-maps.controller.js');
    jhipsterFunc.addJavaScriptToIndex('app/leaflet-maps/leaflet-maps.controller.js');
    this.template('src/main/webapp/scripts/app/leaflet-maps/_leaflet-maps.html', webappDir + 'scripts/app/leaflet-maps/leaflet-maps.html');
    this.template('src/main/webapp/scripts/app/leaflet-maps/_leaflet-maps.js', webappDir + 'scripts/app/leaflet-maps/leaflet-maps.js');
    jhipsterFunc.addJavaScriptToIndex('app/leaflet-maps/leaflet-maps.js');
    jhipsterFunc.addElementToMenu('leaflet-maps', 'globe', false);

    done();


  },

  install: function() {
    var injectDependenciesAndConstants = function() {
      switch (this.frontendBuilder) {
        case 'gulp':
          this.spawnCommand('gulp', ['ngconstant:dev', 'wiredep:test', 'wiredep:app']);
          break;
        case 'grunt':
        default:
          this.spawnCommand('grunt', ['ngconstant:dev', 'wiredep']);
      }
    };

    this.installDependencies({
      callback: injectDependenciesAndConstants.bind(this)
    });

  }

});

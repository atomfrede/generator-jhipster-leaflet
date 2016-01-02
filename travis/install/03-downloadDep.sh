#!/bin/bash
set -ev
#-------------------------------------------------------------------------------
# Use jhipster-travis-build that contain .m2 and node_modules
#-------------------------------------------------------------------------------
if [ $JHIPSTER_MVN_DEP == 1 ]; then
  cd $TRAVIS_BUILD_DIR/
  git clone https://github.com/jhipster/jhipster-travis-build.git
  rm -Rf $HOME/.m2/repository/
  mv $TRAVIS_BUILD_DIR/jhipster-travis-build/repository $HOME/.m2/
  mv $TRAVIS_BUILD_DIR/jhipster-travis-build/node_modules/ $JHIPSTER_SAMPLES/$JHIPSTER/
  ls -al $HOME/.m2/ $HOME/.m2/repository/ $JHIPSTER_SAMPLES/$JHIPSTER/
#-------------------------------------------------------------------------------
# Clone official jhipster-sample-app
#-------------------------------------------------------------------------------
elif [ $JHIPSTER_MVN_DEP == 2 ]; then
  cd $TRAVIS_BUILD_DIR/
  git clone https://github.com/jhipster/jhipster-sample-app.git
  cd $TRAVIS_BUILD_DIR/jhipster-sample-app/
  mvn dependency:go-offline
#-------------------------------------------------------------------------------
# By default, do nothing
#-------------------------------------------------------------------------------
else
  echo "By default, no speedup build..."
fi

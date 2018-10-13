import React from 'react';
import sinon from 'sinon';
import MapLoader from '../../../src/components/MapLoader/MapLoader';

describe('<MapLoader />', function ()  {
  describe('successful fetch', function () {
    beforeEach(function () {
      global.fetch = sinon.stub().resolves({
        ok: true,
        json: sinon.stub().resolves({ some: 'json' })
      });
    });

    it('should render the renderLoading prop', function () {
      const loadingStub = sinon.stub();
      const childrenStub = sinon.stub();
      shallow(<MapLoader url='https://mock.url' renderLoading={loadingStub}>{childrenStub}</MapLoader>);
      expect(loadingStub).to.have.been.called;
    });

    it('should render the children prop', function (done) {
      const errorStub = sinon.stub();
      const childrenStub = sinon.stub().callsFake(() => {
        expect(childrenStub).to.have.been.calledWith({ some: 'json' });
        expect(errorStub).not.to.have.been.called;
        done();
      });
      shallow(<MapLoader url='https://mock.url' renderError={errorStub}>{childrenStub}</MapLoader>);
    });
  });

  describe('failed fetch', function () {
    beforeEach(function () {
      global.fetch = sinon.stub().resolves({
        ok: false
      });
    });

    it('should render the renderLoading prop', function () {
      const loadingStub = sinon.stub();
      const errorStub = sinon.stub();
      const childrenStub = sinon.stub();
      shallow(<MapLoader url='https://mock.url' renderLoading={loadingStub} renderError={errorStub}>{childrenStub}</MapLoader>);
      expect(loadingStub).to.have.been.called;
    });

    it('should render the renderError prop', function (done) {
      const childrenStub = sinon.stub();
      const errorStub = sinon.stub().callsFake(() => {
        expect(childrenStub).not.to.have.been.called;
        expect(errorStub).to.have.been.called;
        done();
      });
      shallow(<MapLoader url='https://mock.url' renderError={errorStub}>{childrenStub}</MapLoader>);
    });
  });
});

'use strict';

const {equal} = require('assert');
const shared = require('shared-examples-for');
const {By, Target, WebElement} = require('../index');
const {FloatingMatchSettings, Region} = require('eyes.sdk.core');


shared.examplesFor('TestFluentApi', function(test) {
  // fixme fail in java version
  // chrome & chrome fps & ff & ff fps
  xit('TestCheckWindowWithIgnoreRegion_Fluent', async function () {
    const result = await test.eyes.check('Fluent - Window with Ignore region', Target.window()
      .fully()
      .timeout(5000)
      .ignore(new Region(50, 50, 100, 100)));
    equal(result.asExpected, true);
  });

  it('TestCheckRegionWithIgnoreRegion_Fluent', async function () {
    const result = await test.eyes.check("Fluent - Region with Ignore region", Target.region(By.id("overflowing-div"))
      .ignore(new Region(50, 50, 100, 100)));
    equal(result.asExpected, true);
  });

  it('TestCheckFrame_Fully_Fluent', async function () {
    const result = await test.eyes.check("Fluent - Full Frame", Target.frame("frame1").fully());
    equal(result.asExpected, true);
  });

  it('TestCheckFrame_Fluent', async function () {
    const result = await test.eyes.check("Fluent - Frame", Target.frame("frame1"));
    equal(result.asExpected, true);
  });

  it('TestCheckFrameInFrame_Fully_Fluent', async function () {
    const result = await test.eyes.check("Fluent - Full Frame in Frame", Target.frame("frame1")
      .frame("frame1-1")
      .fully());
    equal(result.asExpected, true);
  });

  it('TestCheckRegionInFrame_Fluent', async function () {
    const result = await test.eyes.check('Fluent - Region in Frame', Target.frame('frame1')
      .region(By.id('inner-frame-div'))
      .fully());
    equal(result.asExpected, true);
  });

  it('TestCheckRegionInFrameInFrame_Fluent', async function () {
    const result = await test.eyes.check("Fluent - Region in Frame in Frame", Target.frame("frame1")
      .frame("frame1-1")
      .region(By.tagName("img"))
      .fully());
    equal(result.asExpected, true);
  });

  // fixme fail in java version
  xit('TestCheckFrameInFrame_Fully_Fluent2', async function () {
    let result = await test.eyes.check("Fluent - Window with Ignore region 2", Target.window()
      .fully()
    );
    equal(result.asExpected, true);

    result = await test.eyes.check("Fluent - Full Frame in Frame 2", Target.frame("frame1")
      .frame("frame1-1")
      .fully());
    equal(result.asExpected, true);
  });

  // fixme fail in java version
  // chrome fps & ff fps
  xit('TestCheckWindowWithIgnoreBySelector_Fluent', async function () {
    const result = await test.eyes.check('Fluent - Window with ignore region by selector', Target.window()
      .ignore(By.id('overflowing-div')));
    equal(result.asExpected, true);
  });

  // fixme fail in java version
  // chrome fps & ff fps
  xit('TestCheckWindowWithFloatingBySelector_Fluent', async function () {
    const result = await test.eyes.check('Fluent - Window with floating region by selector', Target.window()
      .floating(By.id('overflowing-div'), 3, 3, 20, 30));
    equal(result.asExpected, true);
  });

  it('TestCheckWindowWithFloatingByRegion_Fluent', async function () {
    const settings = Target.window().floating(new Region(10, 10, 20, 20), 3, 3, 20, 30);
    await test.eyes.check("Fluent - Window with floating region by region", settings);

    test.setExpectedFloatingsRegions(new FloatingMatchSettings(10, 10, 20, 20, 3, 3, 20, 30));
  });

  it('TestCheckElementFully_Fluent', async function () {
    const {value: element} = await test.browser.element('#overflowing-div-image');
    const webElement = new WebElement(test.eyes.getDriver(), element);
    let result = await test.eyes.check('Fluent - Region by element - fully', Target.region(webElement).fully());
    equal(result.asExpected, true);
  });

  it('TestCheckElement_Fluent', async function () {
    const {value: element} = await test.browser.element('#overflowing-div-image');
    const webElement = new WebElement(test.eyes.getDriver(), element);
    let result = await test.eyes.check("Fluent - Region by element", Target.region(webElement));
    equal(result.asExpected, true);
  });
});

module.exports.TestFluentApi = shared;

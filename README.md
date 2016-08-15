# ionic2-performance-issue-demo
A small code example showing a performance issue

## How to reproduce

```cmd
git clone https://github.com/daixtrose/ionic2-performance-issue-demo
cd ionic2-performance-issue-demo
npm install
ionic serve
```

and to confirm it is device-independent:

```cmd
ionic run android
```

Please comment using [this issue](https://github.com/daixtrose/ionic2-performance-issue-demo/issues/1).

## Description

There is some weird interference between the y-t plot and the gauges which both should update in a 250 ms raster.

If only one of the plots is active everything is fine, e.g. y-t plot runs:

![image](https://cloud.githubusercontent.com/assets/5588692/17675712/3223c154-632b-11e6-963a-4d92118d9856.png)

But once you add the gauges, the y-t plot slows down:

![image](https://cloud.githubusercontent.com/assets/5588692/17675730/483ca532-632b-11e6-8581-27237e94fd69.png)



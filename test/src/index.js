const { fancy } = require('@phenomnomnominal/fancy');

fancy(`# FOO
## BAR
### BAZ
#### BOP`);

fancy(`# [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
## [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
### [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
#### [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
##### [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
###### [https://pbs.twimg.com/media/Dj8uotIVsAA0m_G.jpg] COSY! 
`, {
    h1: {
        backgroundColor: 'blue',
        color: 'white',
    },
    h2: {
        backgroundColor: 'red',
        color: 'white',
    },
    h3: {
        backgroundColor: 'yellow'
    },
    h4: {
        backgroundColor: 'limegreen',
        color: 'white',
    },
    h5: {
        backgroundColor: 'pink',
        color: 'white',
    },
    h6: {
        backgroundColor: 'black',
        color: 'white',
    }
});

fancy(`# FOO
## BAR
### BAZ
#### BOP`, {
    h3: {
        backgroundColor: 'red',
        color: 'green'
    }
});

Page({

  data: {
    tabIndex: 0,
  },

  onLoad() {

  },

  switch(e) {
    const {index} = e.target.dataset
    this.setData({tabIndex: index})
  },

})

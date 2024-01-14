const PageView = require('../models/pageViewSchema');

// pageView APIs

const sendPageViewData = async (req, res) => {
    try {
        const pageView = new PageView(req.body);
        await pageView.save();
        res.status(200).json({ message: 'Page view event saved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getPageViewData = async (req, res) => {
    try {
      const pageViews = await PageView.find().sort({ timestamp: -1 });
  
      if (pageViews.length === 0) {
        throw new Error('No page view data found.');
      }
  
      res.status(200).json(pageViews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const updateTableData = async (req,res) => {
  try {
    // Update logic based on the data received in the request body
    const updatedData = req.body;
    // console.log('Update data received:', req.body);
    const result = await PageView.updateMany({}, { $set: updatedData });
    res.status(200).json({ message: 'Data updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    sendPageViewData, getPageViewData, updateTableData
}
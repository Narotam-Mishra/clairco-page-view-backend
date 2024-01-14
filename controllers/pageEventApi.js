const PageView = require('../models/pageViewSchema');

// pageView APIs

// sendPageViewData (write operation) --> this API will run on every click of 'Generate Page View Event' button (from frontend)
// and will will create data on DB and save it
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

// getPageViewData (read operation) --> this API will fetch data on every click of 'Fetch Page View Data' (from frontend)
// and render into those into table.
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

// updateTableData --> this API will update all table data on every click of 'Update Table Data' (from frontend)
// and render updated data into table 
const updateTableData = async (req,res) => {
  try {
    // Update logic based on the data received in the request body
    const updatedData = req.body;
    // console.log('Update data received:', req.body);
    
    // update all data
    const result = await PageView.updateMany({}, { $set: updatedData });
    res.status(200).json({ message: 'Data updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// export all APIs (to Route)
module.exports = {
    sendPageViewData, getPageViewData, updateTableData
}
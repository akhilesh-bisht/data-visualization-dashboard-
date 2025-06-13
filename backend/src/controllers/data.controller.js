import { Data } from "../models/data.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllData = async (req, res) => {
  try {
    const filters = { ...req.query }; // get all query parameters

    // optional: remove empty string filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === '') delete filters[key];
    });

    const data = await Data.find(filters);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Filtered data fetched successfully"));
  } catch (error) {
    const apiError = new ApiError(500, "Failed to fetch data", error.message);
    return res.status(500).json(apiError);
  }
};


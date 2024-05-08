import axios from "axios";

const serverUrl = process.env.SERVER_URL!;

export async function CreateSlide(data: any) {
  console.log("CreateSlide");
  try {
    const response = await axios.post(serverUrl + "/slides", data, {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function UpdateSlide(data: {
  _id: string;
  pdf_url: string;
  name: string;
}) {
  console.log("UpdateSlide");
  try {
    const response = await axios.put(
      serverUrl + `/slides/${data._id}`,
      data,
      {}
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function ConvertPdfToImages(slideId: string) {
  console.log("ConvertPdfToImages");
  try {
    const response = await axios.post(
      serverUrl + `/slides/${slideId}/pdf-to-images`,
      {},
      {}
    );

    // // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetSlides() {
  console.log("GetSlides");
  try {
    const response = await axios.get(serverUrl + "/slides", {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetSlide(slideId: string) {
  console.log("GetSlide");
  try {
    const response = await axios.get(serverUrl + `/slides/${slideId}`, {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetSlideImages(slideId: string) {
  console.log("GetSlideImages");
  try {
    const response = await axios.get(
      serverUrl + `/slides/${slideId}/images`,
      {}
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GenerateSlideImageText(slideImageId: string) {
  console.log("GenerateSlideImageText");
  try {
    const response = await axios.post(
      serverUrl + `/generate-image-text/${slideImageId}`,
      {},
      {}
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

// ping
export async function Ping() {
  console.log("Ping");
  try {
    const response = await axios.get(serverUrl + "/ping", {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

// search with question & context
export async function Search(data: { question: string; context: string }) {
  console.log("Search");
  try {
    const response = await axios.post(serverUrl + "/search", data, {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

// generated audio for slide image text
export async function GenerateAudio(data: { slide_image_id: string }) {
  console.log("GenerateAudio");
  try {
    const response = await axios.post(serverUrl + "/generate-audio", data, {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

// delete slide
export async function DeleteSlide(slideId: string) {
  console.log("DeleteSlide");
  try {
    const response = await axios.delete(serverUrl + `/slides/${slideId}`, {});

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

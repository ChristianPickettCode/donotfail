"use server";
import axios from "axios";

const serverUrl = process.env.SERVER_URL!;

export async function CreateSlide(data: any) {
  console.log("CreateSlide");
  try {
    const response = await axios.post(serverUrl + "/slide", data, {});

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
  id: string;
  pdf_url: string;
  name: string;
}) {
  console.log("UpdateSlide");
  try {
    const response = await axios.put(serverUrl + `/slide/${data.id}`, data, {});

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
      serverUrl + `/convert-pdf-to-images/${slideId}`,
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
    const response = await axios.get(serverUrl + `/slide/${slideId}`, {});

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
      serverUrl + `/slide/images/${slideId}`,
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
    const response = await axios.delete(serverUrl + `/slide/${slideId}`, {});

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

// create space
export async function CreateSpace(data: any) {
  console.log("CreateSpace");
  try {
    const response = await axios.post(serverUrl + "/space", data, {});

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

// get spaces
export async function GetSpaces() {
  console.log("GetSpaces");
  try {
    const response = await axios.get(serverUrl + "/spaces", {});

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

// get all slides in a space
export async function GetSpaceSlides(spaceId: string) {
  console.log("GetSpaceSlides");
  try {
    const response = await axios.get(
      serverUrl + `/space-slides/${spaceId}`,
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

// add slide to space
export async function AddSlideToSpace(data: {
  space_id: string;
  slide_id: string;
}) {
  console.log("AddSlideToSpace");
  try {
    const response = await axios.put(
      serverUrl + "/add-slide-to-space",
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
// remove from space
export async function RemoveSlideFromSpace(data: {
  space_id: string;
  slide_id: string;
}) {
  console.log("RemoveSlideFromSpace");
  try {
    const response = await axios.put(
      serverUrl + "/remove-slide-from-space",
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

// delete space
export async function DeleteSpace(spaceId: string) {
  console.log("DeleteSpace");
  try {
    const response = await axios.delete(serverUrl + `/space/${spaceId}`, {});

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

export async function GenerateAllImageText(slideId: string) {
  console.log("GenerateAllImageText");
  try {
    const response = await axios.post(
      serverUrl + `/generate-all-image-text/${slideId}`,
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

// generate notes
export async function GenerateNotes(slideId: string) {
  console.log("GenerateNotes");
  try {
    const response = await axios.post(
      serverUrl + `/generate-notes/${slideId}`,
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

// GenerateAllAudioForSlide
export async function GenerateAllAudioForSlide(slideId: string) {
  console.log("GenerateAllAudioForSlide");
  try {
    const response = await axios.post(
      serverUrl + `/generate-all-audio/${slideId}`,
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

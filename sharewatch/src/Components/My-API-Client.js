import React from "react";
import Axios from "axios";

export default function MyAPIClient() {
  axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
}

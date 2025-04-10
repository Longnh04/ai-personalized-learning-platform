import React from "react";
import { useEffect } from "react";

// ./auth/userinfo.email
// ./auth/userinfo.profile

const CLIENT_ID = "832596126497-gsb0qrt6i7q4kvd0bbtes699h0qph62q.apps.googleusercontent.com";

const CLIENT_SECRET = "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";

const LINK_GET_TOKEN = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://localhost:3000/&client_id=${CLIENT_ID}&`

document.addEventListener("DOMContentLoaded", function () {
  const googleLoginButton = document.getElementById("google-login-button");
  if (googleLoginButton) {
    googleLoginButton.addEventListener("click", function () {
      window.location.href = LINK_GET_TOKEN;
    });
  }
});


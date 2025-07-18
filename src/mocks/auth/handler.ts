// import { HttpResponse, http } from "msw";

// import { authURL, baseURL } from "shared/api";

// import { spawnUser } from "mocks/settings/user/factory";

// const currentUser = spawnUser();

export const authHandlers = [
  // http.get(`${authURL}/${Path.LOGIN}/${Path.OTP}`, ({ request }) => {
  //   const phone = request.headers.get("X-Phone");
  //   const password = request.headers.get("X-Password");
  //   if (phone && password) {
  //     return HttpResponse.json();
  //   } else {
  //     return HttpResponse.json({}, { status: 422 });
  //   }
  // }),
  // http.get(`${authURL}/${Path.LOGIN}/${Path.OTP}/${Path.VERIFY}`, () => {
  //   return HttpResponse.json({
  //     token: "fZOKzKpA6LDYWL1FPK8tSxXwEAqHWthuAcrC9cTukgntp4qD",
  //   });
  // }),
  // http.get(`${baseURL}/${Path.USERS}/${Path.CURRENT}`, () => {
  //   // return HttpResponse.json({ result: currentUser });
  // }),
  // http.get(`${authURL}/${Path.LOGOUT}`, () => {
  //   return HttpResponse.json();
  // }),
  // http.get(`${baseMockURL}/${Path.AUTH}/${Path.CHECK_TWO_FACTOR}`, () => {
  //   return HttpResponse.json({ password_required: true, message: 'f' });
  // }),
];

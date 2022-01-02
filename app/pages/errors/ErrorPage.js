import React from "react";

export function ErrorPage() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v1"
          style="/media/error/bg1.jpg"      >
          <div className="kt-error-v1__container">
            <h1 className="kt-error-v1__number">404</h1>
            <p className="kt-error-v1__desc">OOPS! Something went wrong here</p>
          </div>
        </div>
      </div>
    </>
  );
}

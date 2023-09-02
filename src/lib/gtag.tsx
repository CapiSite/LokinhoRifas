export const GA_TRACKING_ID = "AW-10996711319"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }:any) => {

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
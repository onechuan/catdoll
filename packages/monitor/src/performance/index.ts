import fetch from "./fetch";
import observerEntries from "./observerEntries";
import observerFCP from "./observerFCP";
import observerLCP from "./observerLCP";
import observerPaint from "./observerPaint";
import observerLoad from "./observerLoad";
import xhr from "./xhr";

export default function performance() {
  fetch();
  observerEntries();
  observerLCP();
  observerFCP();
  observerLoad();
  observerPaint();
  xhr();
}
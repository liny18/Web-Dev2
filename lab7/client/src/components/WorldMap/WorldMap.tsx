import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import { GeoJSON } from "geojson";

interface CountryData {
  name: string;
  capital: string;
  currency: string;
  code: string;
}

interface WorldMapProps {
  data: CountryData[];
}

function isFeatureCollection(
  geojson:
    | GeoJSON.GeometryObject
    | GeoJSON.GeometryCollection
    | GeoJSON.Feature
    | GeoJSON.FeatureCollection
): geojson is GeoJSON.FeatureCollection {
  return "features" in geojson;
}

const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 960;
    const height = 480;

    const projection = geoNaturalEarth1()
      .scale(153)
      .translate([width / 2, height / 2]);
    const path = geoPath().projection(projection);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip hidden")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "0.5rem")
      .style("border-radius", "0.25rem");

    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(
      (topology) => {
        const countries = feature(
          topology as Topology,
          (topology as Topology).objects.countries
        );

        if (!isFeatureCollection(countries)) {
          console.error("Invalid data format");
          return;
        }

        const countryCodeToData = new Map<string, CountryData>();
        data.forEach((country) => {
          countryCodeToData.set(country.code, country);
          console.log(countryCodeToData);
        });

        d3.select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .style("background-color", "#e6f3ff")
          .style("border", "1px solid #333")
          .style("border-radius", "1rem")
          .selectAll("path")
          .data(countries.features)
          .join("path")
          .attr("d", path)
          .attr("fill", "#bda3e3")
          .attr("stroke", "#333")
          .on("mouseover", (event, d) => {
            const countryData = countryCodeToData.get(d.id as string);
            if (countryData) {
              const tooltipHeight = 60; // Adjust the height based on your tooltip content
              tooltip
                .html(
                  `<div class="font-bold">${countryData.name}</div>
                  <div>Capital: ${countryData.capital}</div>
                  <div>Currency: ${countryData.currency}</div>`
                )
                .style("position", "absolute")
                .style("left", `${event.clientX}px`)
                .style("top", `${event.clientY + tooltipHeight}px`)
                .style("opacity", 1)
                .classed("hidden", false);
            }
          })

          .on("mouseout", () => {
            tooltip.classed("hidden", true).style("opacity", 0);
          });
      }
    );
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <svg ref={svgRef} style={{ margin: "auto" }}></svg>
    </div>
  );
};

export default WorldMap;

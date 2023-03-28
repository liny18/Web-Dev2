import React, { useContext, useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import { UserContext } from "../../App";
import styles from "./Dropdown.module.css";

export const DropdownMenu = () => {
  const context = useContext(UserContext);
  const translations = context.allTranslations;

  const accessProperties = (
    str: string,
    translations: { [key: string]: { common: string; official: string } }[]
  ) => {
    let result = { common: "", official: "" };
    translations.forEach((translation) => {
      const key = Object.keys(translation)[0];
      if (key === str) {
        result = translation[key];
      }
    });
    return [result.common, result.official];
  };

  useEffect(() => {
    const [common, official] = accessProperties(
      context.selectedTranslation,
      translations
    );
    context.setCommon(common);
    context.setOfficial(official);
  }, [context.selectedTranslation]);

  const handleChange = (e: any, { value }: any) => {
    context.setSelectedTranslation(value);
  };

  const friendOptions = translations.map((translation) => {
    const key = Object.keys(translation)[0];
    return {
      key: key,
      text: key.toUpperCase(),
      value: key,
    };
  });

  return (
    <Dropdown
      className={styles.drop}
      placeholder={context.selectedTranslation}
      fluid
      selection
      options={friendOptions}
      onChange={handleChange}
    />
  );
};

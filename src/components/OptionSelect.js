import React from 'react';

const OptionSelect = ({ options, defaultValue, defaultMsg, label }) => {
  return (
    <div className="form-group row mt-3">
      <label
        className="col-4 col-sm-4 col-lg-2"
        htmlFor={options.name + '-input'}
      >
        {label}
      </label>
      <select
        name={options.name}
        id={options.name + '-input'}
        className="form-control col-7 col-sm-6 col-lg-4"
        defaultValue={defaultValue}
      >
        <option value={defaultValue}>{defaultMsg}</option>
        {Object.keys(options.data).map((key, index) => {
          return (
            <option key={index} value={options.data[key]}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OptionSelect;

import React from 'react';

const OptionSelect = ({ options, defaultValue, defaultMsg, label }) => {
  return (
    <div className="form-group row mt-3">
      <label className="col-sm-2" htmlFor={options.name + '-input'}>
        {label}
      </label>
      <select
        name={options.name}
        id={options.name + '-input'}
        className="form-control col-sm-3"
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

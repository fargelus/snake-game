import React from 'react';


class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      get_records: false,
    };
    this._records = [];

    this._fetchRecords();
  }

  _fetchRecords() {
    const that = this;
    (async () => {
      const response = await fetch('/scoreboard');
      const data = await response.json();
      that._records = data;
      that.setState({
        get_records: true,
      });
    })();
  }

  _sortRecords() {
    return this._records.sort((someRecord, otherRecord) => {
      return otherRecord.score - someRecord.score;
    });
  }

  render() {
    this._sortRecords();

    const listItems = this._records.map((record, index) => {
      return (
        <div className="d-flex justify-content-between" key={index}>
          <dt>{record.name}</dt>
          <dd className="ml-5">{record.score}</dd>
        </div>
      );
    })

    return (<div>
              <dl className="d-flex flex-column">
                {listItems}
              </dl>
            </div>);
  }
}


export default Board;

import "./selectedList.css";

export default function SelectedList({ selected, onDelete }) {
  function handleDelete(e) {
    onDelete(e.target.value);
  }

  return (
    <div>
      <ul>
        {selected?.map((e) => {
          return (
            <li key={e}>
              {e}
              <button
                type="button"
                value={e}
                onClick={handleDelete}
                className="plusButton"
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

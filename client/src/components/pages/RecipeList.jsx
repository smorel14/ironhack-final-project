import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Link } from 'react-router-dom'
import { Table, Container } from 'reactstrap'
import Loader from 'react-dots-loader'
import Checkbox from 'react-simple-checkbox'
import storage from '../../storage.js'

export default function MyRecipes() {
  const [list, setList] = useState(storage.getListIngredients())

  useEffect(() => {
    api.getMyList().then(listItems => {
      console.log('TCL: MyRecipes -> info', listItems)
      //console.log("TCL: CrudTodos -> response", response);
      setList(listItems)
      storage.setListIngredients(listItems)
      console.log('TCL: MyRecipes -> setRecipes', setList)
    })
  }, [])

  function handleDelete(unit, item) {
    api
      .deleteIngredient(unit, item)
      .then(listItems => {
        console.log('TCL: MyRecipes -> info', listItems)
        //console.log("TCL: CrudTodos -> response", response);
        setList(listItems)
        storage.setListIngredients(listItems)
        console.log('TCL: MyRecipes -> setRecipes', setList)
      })
      .catch(err => console.log('catch: ', err))
  }

  function handleDeleteWholeList() {
    api
      .removeMyList()
      .then(() => {
        console.log('List deleted')
        //console.log("TCL: CrudTodos -> response", response);
        setList([])
        storage.setListIngredients([])
        console.log('TCL: MyRecipes -> setRecipes', setList)
      })
      .catch(err => console.log('catch: ', err))
  }

  function handleClick(i) {
    if (list[i].checked === true) {
      list[i].checked = false
    } else {
      // list[i].checked = true
      list[i].checked = true
    }
    setList([...list])
    storage.setListIngredients([...list])
  }

  function sortIngredients(numbers) {
    let result
    result = numbers
      .sort((a, b) => {
        if (String(a.unit) < String(b.unit)) {
          return -1
        } else return 1
      })
      .sort((a, b) => {
        if (String(a.item) < String(b.item)) {
          return -1
        } else return 1
      })

    return result
  }

  function removeDoubles(ingredients) {
    let newArray = []
    let mergedcell
    if (ingredients.length > 0) {
      mergedcell = ingredients[0]
    }
    for (let i = 1; i < ingredients.length; i++) {
      if (
        mergedcell.unit === ingredients[i].unit &&
        mergedcell.item === ingredients[i].item
      ) {
        mergedcell = mergedCells(mergedcell, ingredients[i])
      } else {
        newArray.push(mergedcell)
        mergedcell = ingredients[i]
      }
    }
    if (
      mergedcell.unit !== ingredients[ingredients.length - 2].unit ||
      mergedcell.item !== ingredients[ingredients.length - 2].item
    ) {
      newArray.push(mergedcell)
    }
    return newArray
  }

  function mergedCells(cell1, cell2) {
    let mergedCells
    mergedCells = {
      qty: cell1.qty + cell2.qty,
      unit: cell1.unit,
      item: cell1.item,
      checked: cell1.checked,
    }
    return mergedCells
  }

  // function sortIngredients(numbers) {
  //   let result = numbers.sort((a, b) => {
  //     if (a.checked < b.checked) {
  //       return -1
  //     } else return 1
  //   })
  //   console.log('TEST', result)
  //   return result
  // }

  if (list.length === 0)
    return (
      <Container>
        <h5 className="mt-4">
          You havent added any ingredients to your grocery list yet.{' '}
          <Link to={'recipes/explore'}>Start exploring recipes now!</Link>
        </h5>
      </Container>
    )

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <strong>#</strong>
            </th>
            <th>
              <strong>Unit</strong>
            </th>
            <th>
              <strong>Ingredient</strong>
            </th>
            <th>
              <strong>Action</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {!list && <Loader size={10}>Loading...</Loader>}
          {list &&
            // // sortIngredients(list)
            // list.map((l, i) => (
            //   <tr key={i}>
            //     <th scope="row" className="ClickablePicture">
            //       <Checkbox
            //         size="3"
            //         checked={l.checked}
            //         color="#8ab661"
            //         onChange={() => handleClick(i)}
            //       />
            //     </th>
            //     <td className="align-middle">
            //       {l.qty} {l.unit}
            //     </td>
            //     <td className="align-middle">{l.item}</td>
            //     <td>
            //       <button
            //         className="delete-button"
            //         size="sm"
            //         onClick={() => handleDelete(i)}
            //       >
            //         Delete
            //       </button>
            //     </td>
            //   </tr>
            // ))}
            removeDoubles(sortIngredients(list))
              //list
              .map((l, i) => (
                <tr
                  key={i}
                  // style={{
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   alignContent: 'center',
                  //   border: '3px solid black',
                  // }}
                >
                  <th scope="row">
                    <Checkbox
                      size="3"
                      checked={l.checked}
                      color="#8ab661"
                      onChange={() => handleClick(i)}
                    />
                  </th>

                  <td
                    style={{
                      padding: '25px 12px 0px 12px',
                    }}
                  >
                    {/* list[i].checked === true */}
                    {list[i].checked === true ? (
                      <strike>
                        {' '}
                        {l.qty} {l.unit}{' '}
                      </strike>
                    ) : (
                      <div>
                        {' '}
                        {l.qty} {l.unit}{' '}
                      </div>
                    )}
                  </td>

                  <td
                    style={{
                      padding: '25px 12px 0px 12px',
                    }}
                  >
                    {list[i].checked === true ? (
                      <strike> {l.item} </strike>
                    ) : (
                      <div> {l.item} </div>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(l.unit, l.item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <button
        className="delete-button align-center"
        style={{ width: '50%', marginBottom: '20px' }}
        onClick={() => handleDeleteWholeList()}
      >
        Delete all
      </button>
    </Container>
  )
}

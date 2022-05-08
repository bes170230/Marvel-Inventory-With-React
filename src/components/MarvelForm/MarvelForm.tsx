import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import {useForm} from 'react-hook-form'
import { Button } from '@mui/material'
import { chooseName, choosePrice, chooseDirector, chooseDescription, chooseBudget, chooseRating, chooseReleaseDate, chooseRuntime } from '../../redux/slices/rootSlice'
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api'
import { useGetData } from '../../custom-hooks'

interface MarvelFormProps{
    id?:string;
    data?:{}
}

interface MarvelState {
    name:string,
    price:string;
    description:string;
    director:string;
    budget:string;
    rating:string;
    release_date:string;
    runtime:string;
}

export const MarvelForm = (props:MarvelFormProps) => {
    const dispatch = useDispatch();
    let {marvelData, getData} = useGetData();
    const store = useStore();

    // How to select your State as a variable
    const name = useSelector<MarvelState>(state => state.name)
    const price = useSelector<MarvelState>(state => state.price)

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if(props.id!) {
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data.name} \n ID: ${props.id}`)
            window.location.reload();
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            dispatch(chooseDirector(data.director))
            dispatch(chooseDescription(data.description))
            dispatch(chooseReleaseDate(data.release_date))
            dispatch(chooseRuntime(data.runtime))
            dispatch(chooseRating(data.rating))
            dispatch(chooseBudget(data.budget))

            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.reset();
        }
    }
    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Movie Name</label>
                    <Input {...register('name')} name='name' placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name='price' placeholder='12.00' />
                </div>
                <div>
                    <label htmlFor="director">Director</label>
                    <Input {...register('director')} name='director' placeholder='John Smith' />
                </div>
                <div>
                    <label htmlFor="budget">Budget</label>
                    <Input {...register('budget')} name='budget' placeholder='$50 million' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name='description' placeholder='Sequel' />
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <Input {...register('rating')} name='rating' placeholder='PG-13' />
                </div>
                <div>
                    <label htmlFor="runtime">Runtime</label>
                    <Input {...register('runtime')} name='runtime' placeholder='90 minutes' />
                </div>
                <div>
                    <label htmlFor="release_date">Release Date</label>
                    <Input {...register('release_date')} name='release_date' placeholder='March 1, 1999' />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
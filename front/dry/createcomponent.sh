#!/bin/bash

cd ..

while [ "$1" != "" ]; do
    ng g c $1 --skip-tests
    shift
done

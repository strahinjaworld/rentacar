@extends('layouts.app')

@section('content')
<div class="container">
    @if (Route::has('login'))
            <div class="top-right links">
                @auth
                    <a class="btn btn-primary" href="{{ url('/home') }}">Home</a>
                @else
                    <a class="btn btn-primary" href="{{ route('login') }}">Login</a>

                    @if (Route::has('register'))
                        <a class="btn btn-primary" href="{{ route('register') }}">Register</a>
                    @endif
                @endauth
            </div>
        @endif
</div>
@endsection

